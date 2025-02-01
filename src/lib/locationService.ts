import { supabase } from './supabase';
import { Cache, CACHE_KEYS, CACHE_EXPIRY } from './cache';

export interface Region {
  id: string;
  name: string;
}

export interface Country {
  id: string;
  name: string;
  code: string;
  region_id: string;
  region: {
    name: string;
  };
}

export interface StateProvince {
  id: string;
  name: string;
  code: string | null;
  type: 'state' | 'province';
}

export interface Language {
  id: string;
  code: string;
  name: string;
  native_name: string;
  region: string;
  active: boolean;
}

export class LocationService {
  static async getRegions(): Promise<Region[]> {
    // Check cache first
    const cachedRegions = Cache.get<Region[]>(CACHE_KEYS.REGIONS);
    if (cachedRegions) {
      return cachedRegions;
    }

    // Fetch from API if not cached
    const { data, error } = await supabase
      .from('regions')
      .select('*')
      .order('name');

    if (error) throw error;

    // Cache the results
    Cache.set(CACHE_KEYS.REGIONS, data, CACHE_EXPIRY.REGIONS);
    return data;
  }

  static async getCountries(): Promise<Country[]> {
    // Check cache first
    const cachedCountries = Cache.get<Country[]>(CACHE_KEYS.COUNTRIES);
    if (cachedCountries) {
      return cachedCountries;
    }

    // Fetch from API if not cached
    const { data, error } = await supabase
      .from('countries')
      .select(`
        id,
        name,
        code,
        region_id,
        region:regions(name)
      `)
      .order('name');

    if (error) throw error;

    // Cache the results
    Cache.set(CACHE_KEYS.COUNTRIES, data, CACHE_EXPIRY.COUNTRIES);
    return data;
  }

  static async getStatesProvinces(countryId: string): Promise<StateProvince[]> {
    // Check cache first
    const cacheKey = `${CACHE_KEYS.STATES_PROVINCES}:${countryId}`;
    const cachedStatesProvinces = Cache.get<StateProvince[]>(cacheKey);
    if (cachedStatesProvinces) {
      return cachedStatesProvinces;
    }

    // Fetch from API if not cached
    const { data, error } = await supabase
      .from('states_provinces')
      .select('id, name, code, type')
      .eq('country_id', countryId)
      .order('name');

    if (error) throw error;

    // Cache the results
    Cache.set(cacheKey, data, CACHE_EXPIRY.STATES_PROVINCES);
    return data;
  }

  static async getLanguages(): Promise<Language[]> {
    // Check cache first
    const cachedLanguages = Cache.get<Language[]>(CACHE_KEYS.LANGUAGES);
    if (cachedLanguages) {
      return cachedLanguages;
    }

    // Fetch from API if not cached
    const { data, error } = await supabase
      .from('languages')
      .select('*')
      .eq('active', true)
      .order('name');

    if (error) throw error;

    // Cache the results
    Cache.set(CACHE_KEYS.LANGUAGES, data, CACHE_EXPIRY.LANGUAGES);
    return data;
  }

  // Helper method to group countries by region
  static groupCountriesByRegion(countries: Country[]): Record<string, Country[]> {
    return countries.reduce((acc, country) => {
      const regionName = country.region.name;
      if (!acc[regionName]) {
        acc[regionName] = [];
      }
      acc[regionName].push(country);
      return acc;
    }, {} as Record<string, Country[]>);
  }

  // Helper method to group languages by region
  static groupLanguagesByRegion(languages: Language[]): Record<string, Language[]> {
    return languages.reduce((acc, language) => {
      if (!acc[language.region]) {
        acc[language.region] = [];
      }
      acc[language.region].push(language);
      return acc;
    }, {} as Record<string, Language[]>);
  }

  // Clear all location-related caches
  static clearCache(): void {
    Cache.clear();
  }
}