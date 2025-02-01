export interface OddsFormat {
  id: string;
  name: string;
  example: string;
}

export interface FormData {
  odds1: string;
  odds2: string;
  odds3: string;
  isThreeWay: boolean;
}

export interface ResultsData {
  totalVig: number;
  fairValue: number;
  trueProb1: number;
  trueProb2: number;
  trueProb3?: number;
}

export interface ValidationErrors {
  odds1?: string;
  odds2?: string;
  odds3?: string;
}