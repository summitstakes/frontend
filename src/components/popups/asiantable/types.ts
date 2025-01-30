export interface Outcome {
  teamA: string;
  resultA: string;
  teamB: string;
  resultB: string;
}

export interface HandicapRow {
  negative: string;
  positive: string;
  outcomes?: Outcome[];
}

export interface AsianHandicapProps {
  isOpen: boolean;
  onClose: () => void;
}