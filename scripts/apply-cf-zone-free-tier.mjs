#!/usr/bin/env node

const ZONE_ID = "b67d2a0bef27e51f5325b579013c78a4";
const REDIRECT_RULESET_ID = "4543589b903540c78ab94395e6813c07";

const token = process.env.CLOUDFLARE_API_TOKEN;
if (!token) {
  console.error("[cf-zone] Set CLOUDFLARE_API_TOKEN with Zone Settings Edit for this zone.");
  process.exit(1);
}

/** @param {string} path @param {RequestInit} init */
async function cf(path, init = {}) {
  const response = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init.headers
    }
  });
  const json = await response.json();
  if (!json.success) {
    throw new Error(`${path} failed: ${JSON.stringify(json.errors ?? json)}`);
  }
  return json.result;
}

/** @param {string} id @param {unknown} value */
async function patchSetting(id, value) {
  const result = await cf(`/zones/${ZONE_ID}/settings/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ value })
  });
  console.log(`OK: ${id} = ${JSON.stringify(result.value ?? result)}`);
}

async function ensureWwwRedirectRule() {
  const ruleset = await cf(`/zones/${ZONE_ID}/rulesets/${REDIRECT_RULESET_ID}`);
  const existing = ruleset.rules?.find(
    (rule) => rule.description === "Redirect www.davidweng.eu.org to apex"
  );
  if (existing) {
    console.log("OK: www→apex redirect rule already present");
    return;
  }

  await cf(`/zones/${ZONE_ID}/rulesets/${REDIRECT_RULESET_ID}/rules`, {
    method: "POST",
    body: JSON.stringify({
      action: "redirect",
      expression: '(http.host eq "www.davidweng.eu.org")',
      description: "Redirect www.davidweng.eu.org to apex",
      enabled: true,
      action_parameters: {
        from_value: {
          target_url: {
            expression: 'concat("https://davidweng.eu.org", http.request.uri.path)'
          },
          status_code: 301,
          preserve_query_string: true
        }
      }
    })
  });
  console.log("OK: created www→apex redirect rule");
}

async function ensureBotFightModeOff() {
  const result = await cf(`/zones/${ZONE_ID}/bot_management`, {
    method: "PUT",
    body: JSON.stringify({ fight_mode: false })
  });
  console.log(`OK: bot_management.fight_mode = ${result.fight_mode}`);
}

async function main() {
  const settings = [
    ["brotli", "on"],
    ["early_hints", "on"],
    ["http3", "on"],
    ["0rtt", "on"],
    ["always_use_https", "on"],
    ["automatic_https_rewrites", "off"],
    ["rocket_loader", "off"],
    ["tls_1_3", "on"],
    ["ipv6", "on"],
    ["sort_query_string_for_cache", "on"],
    ["email_obfuscation", "off"],
    ["browser_cache_ttl", 14400],
    ["cache_level", "aggressive"],
    ["development_mode", "off"],
    ["minify", { css: "off", html: "off", js: "off" }],
    ["mirage", "off"]
  ];

  for (const [id, value] of settings) {
    await patchSetting(id, value);
  }

  await ensureWwwRedirectRule();
  await ensureBotFightModeOff();
  console.log("[cf-zone] Done.");
}

main().catch((error) => {
  console.error(`[cf-zone] ${error.message}`);
  process.exit(1);
});