#!/usr/bin/env node
/**
 * Post-deploy checks for davidweng.eu.org Zone redirects.
 * Requires CLOUDFLARE_API_TOKEN for API rule inspection (optional).
 *
 * Usage:
 *   node scripts/verify-zone-redirects.mjs
 *   node scripts/verify-zone-redirects.mjs --curl
 */

const ZONE_ID = "b67d2a0bef27e51f5325b579013c78a4";
const REDIRECT_RULESET_ID = "4543589b903540c78ab94395e6813c07";
const APEX = "davidweng.eu.org";
const WWW = "www.davidweng.eu.org";
const UA =
  "Mozilla/5.0 (compatible; davidweng-portfolio-verify/1.0; +https://davidweng.eu.org)";

/** @param {string} path */
async function cfGet(path) {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!token) {
    return null;
  }

  const response = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const json = await response.json();
  if (!json.success) {
    throw new Error(`${path} failed: ${JSON.stringify(json.errors ?? json)}`);
  }
  return json.result;
}

/** @param {string} url */
async function probeRedirect(url) {
  const response = await fetch(url, {
    method: "GET",
    redirect: "manual",
    headers: { "User-Agent": UA }
  });

  return {
    url,
    status: response.status,
    location: response.headers.get("location")
  };
}

/** @param {string} label @param {string} url @param {string | null | undefined} expectedLocation */
function reportRedirect(label, { status, location }, expectedLocation) {
  const ok =
    expectedLocation === undefined
      ? status >= 200 && status < 400 && !location
      : status >= 300 && status < 400 && location === expectedLocation;

  console.log(`${ok ? "PASS" : "FAIL"} ${label}`);
  console.log(`  status: ${status}`);
  console.log(`  location: ${location ?? "<none>"}`);
  if (expectedLocation !== undefined) {
    console.log(`  expected: ${expectedLocation ?? "<no redirect>"}`);
  }
  return ok;
}

async function inspectZoneRules() {
  console.log("\n## Cloudflare zone configuration\n");

  if (!process.env.CLOUDFLARE_API_TOKEN) {
    console.log("SKIP API checks: CLOUDFLARE_API_TOKEN not set");
    return null;
  }

  const httpsSetting = await cfGet(`/zones/${ZONE_ID}/settings/always_use_https`);
  console.log(`always_use_https: ${httpsSetting?.value}`);

  const ruleset = await cfGet(`/zones/${ZONE_ID}/rulesets/${REDIRECT_RULESET_ID}`);
  const wwwRule = ruleset?.rules?.find((rule) =>
    String(rule.description ?? "").includes("www.davidweng.eu.org")
  );

  if (wwwRule) {
    console.log(`www redirect rule: enabled=${wwwRule.enabled}, action=${wwwRule.action}`);
    console.log(`  expression: ${wwwRule.expression}`);
    console.log(
      `  target: ${wwwRule.action_parameters?.from_value?.target_url?.expression ?? "(unknown)"}`
    );
  } else {
    console.log("www redirect rule: MISSING");
  }

  return wwwRule;
}

async function runCurlChecks() {
  console.log("\n## Live redirect probes (no redirect follow)\n");

  const checks = [
    ["HTTP apex upgrades to HTTPS apex", `http://${APEX}/`, `https://${APEX}/`],
    ["HTTP www upgrades to HTTPS www", `http://${WWW}/`, `https://${WWW}/`],
    ["HTTPS www redirects to HTTPS apex", `https://${WWW}/`, `https://${APEX}/`],
    [
      "HTTPS www preserves path and query on apex",
      `https://${WWW}/projects/fraud/?lang=en`,
      `https://${APEX}/projects/fraud/?lang=en`
    ],
    ["HTTPS apex serves without redirect", `https://${APEX}/`, null]
  ];

  let passed = 0;
  for (const [label, url, expected] of checks) {
    const result = await probeRedirect(url);
    if (reportRedirect(label, result, expected)) {
      passed += 1;
    }
  }

  return passed === checks.length;
}

async function main() {
  const runLive = process.argv.includes("--curl") || process.argv.includes("--live");

  await inspectZoneRules();

  if (!runLive) {
    console.log("\nRun with --curl to probe live redirects (may be blocked by bot challenges).");
    return;
  }

  const ok = await runCurlChecks();
  process.exitCode = ok ? 0 : 1;
}

main().catch((error) => {
  console.error(`[verify-zone-redirects] ${error.message}`);
  process.exit(1);
});
