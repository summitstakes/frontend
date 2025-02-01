export interface OddsFormat {
  id: string;
  name: string;
  example: string;
}

export interface FormData {
  odds: string;
  selectedFormat: string;
}

export interface ResultsData {
  decimal: string;
  american: string;
  fractional: string;
  probability: string;
  impliedOdds: string;
}

export interface ValidationErrors {
  odds?: string;
}