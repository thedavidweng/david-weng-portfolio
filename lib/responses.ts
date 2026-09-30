function typedResponse(body: string, contentType: string) {
  return new Response(body, { headers: { "Content-Type": `${contentType}; charset=utf-8` } });
}

export function markdownResponse(body: string) {
  return typedResponse(body, "text/markdown");
}

export function textResponse(body: string) {
  return typedResponse(body, "text/plain");
}
