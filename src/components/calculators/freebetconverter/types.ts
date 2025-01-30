export interface OddsFormat {
  id: string;
  name: string;
  example: string;
}

export interface Currency {
  symbol: string;
  name: string;
}

export interface FormData {
  freeBetAmount: string;
  backOdds: string;
  layOdds: string;
  commission: string;
}

export interface ResultsData {
  freeBetAmount: number;
  layStake: number;
  liability: number;
  conversionRate: number;
  convertedAmount: number;
}

export interface ValidationErrors {
  freeBetAmount?: string;
  backOdds?: string;
  layOdds?: string;
  commission?: string;
}