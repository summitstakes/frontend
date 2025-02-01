// Types for sportsbook data and components
export interface Sportsbook {
  id: string;
  name: string;
  logo: string;
  description: string;
  features: string[];
  rating: number;
  bonus?: string;
}

export interface Region {
  name: string;
  countries: Country[];
}

export interface Country {
  name: string;
  code: string;
  states?: string[];
  provinces?: string[];
  sportsbooks?: Sportsbook[];
}

export interface LocationState {
  region: string | null;
  country: string | null;
  stateOrProvince: string | null;
}

export interface FilterBarProps {
  selectedRegion: string | null;
  setSelectedRegion: (region: string | null) => void;
  selectedCountry: string | null;
  setSelectedCountry: (country: string | null) => void;
  selectedStateOrProvince: string | null;
  setSelectedStateOrProvince: (stateOrProvince: string | null) => void;
  regions: Region[];
}

export interface SportsbookGridProps {
  sportsbooks: Sportsbook[];
  isLoading: boolean;
}