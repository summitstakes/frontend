// Cache keys
export const CACHE_KEYS = {
  REGIONS: 'summit-stakes:regions',
  COUNTRIES: 'summit-stakes:countries',
  LANGUAGES: 'summit-stakes:languages',
  STATES_PROVINCES: 'summit-stakes:states-provinces',
} as const;

// Cache expiry times (in milliseconds)
export const CACHE_EXPIRY = {
  REGIONS: 7 * 24 * 60 * 60 * 1000, // 7 days
  COUNTRIES: 7 * 24 * 60 * 60 * 1000, // 7 days
  LANGUAGES: 7 * 24 * 60 * 60 * 1000, // 7 days
  STATES_PROVINCES: 7 * 24 * 60 * 60 * 1000, // 7 days
} as const;

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

export class Cache {
  static set<T>(key: string, data: T, expiry: number): void {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      expiry
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  static get<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const cachedItem: CacheItem<T> = JSON.parse(item);
    const now = Date.now();

    // Check if cache has expired
    if (now - cachedItem.timestamp > cachedItem.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return cachedItem.data;
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
  }

  static clear(): void {
    Object.values(CACHE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
}