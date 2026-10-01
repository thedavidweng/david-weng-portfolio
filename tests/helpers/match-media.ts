type MediaState = { matches: boolean; listeners: (() => void)[] };

export function installMatchMedia() {
  const queries = new Map<string, MediaState>();
  const state = (query: string) => {
    if (!queries.has(query)) queries.set(query, { matches: false, listeners: [] });
    return queries.get(query)!;
  };
  vi.stubGlobal("matchMedia", (query: string) => {
    const media = state(query);
    return {
      media: query,
      get matches() {
        return media.matches;
      },
      addEventListener: (_type: string, listener: () => void) => media.listeners.push(listener),
      removeEventListener: () => undefined
    };
  });
  return {
    set: (query: string, matches: boolean) => {
      state(query).matches = matches;
    },
    fire: (query: string) => state(query).listeners.forEach((listener) => listener())
  };
}
