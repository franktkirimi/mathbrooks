import "@testing-library/jest-dom";

// jsdom's built-in localStorage needs a `--localstorage-file` path to fully
// function; without one, methods like setItem/removeItem are missing. Back
// it with a plain in-memory implementation so any test can rely on it.
if (typeof window !== "undefined" && (!window.localStorage || typeof window.localStorage.setItem !== "function")) {
  const store = new Map<string, string>();
  const memoryLocalStorage: Storage = {
    get length() {
      return store.size;
    },
    clear: () => store.clear(),
    getItem: (key: string) => (store.has(key) ? store.get(key)! : null),
    key: (index: number) => Array.from(store.keys())[index] ?? null,
    removeItem: (key: string) => {
      store.delete(key);
    },
    setItem: (key: string, value: string) => {
      store.set(key, String(value));
    },
  };
  Object.defineProperty(window, "localStorage", {
    value: memoryLocalStorage,
    writable: true,
  });
}

// Guarded the same way as the localStorage shim above — this file also runs
// for test files that opt into the plain "node" environment (e.g. the
// Phase 1.5 API route handler tests), where `window` doesn't exist at all.
if (typeof window !== "undefined") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }),
  });
}
