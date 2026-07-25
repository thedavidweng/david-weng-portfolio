function cachedResponse(body: string, contentType: string, maxAge: number) {
  return new Response(body, {
    headers: {
      "Content-Type": `${contentType}; charset=utf-8`,
      "Cache-Control": `public, max-age=${maxAge}`
    }
  });
}

export function markdownResponse(body: string) {
  return cachedResponse(body, "text/markdown", 3600);
}

export function textResponse(body: string, maxAge = 3600) {
  return cachedResponse(body, "text/plain", maxAge);
}
