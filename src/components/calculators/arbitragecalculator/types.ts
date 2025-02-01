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
  odds1: string;
  stake1: string;
  odds2: string;
  stake2: string;
}

export interface ResultsData {
  totalInvestment: number;
  totalProfit: number;
  roi: number;
  hasArbitrage: boolean;
  impliedProb1: number;
  impliedProb2: number;
  optimalStake1: number;
  optimalStake2: number;
  potentialReturn1: number;
  potentialReturn2: number;
}

export interface ValidationErrors {
  odds1?: string;
  odds2?: string;
  stake1?: string;
  stake2?: string;
}