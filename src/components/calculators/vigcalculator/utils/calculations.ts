export function calculateVig(odds1: number, odds2: number, odds3: number | null): ResultsData {
  // Calculate raw probabilities
  const prob1 = 1 / odds1;
  const prob2 = 1 / odds2;
  const prob3 = odds3 ? 1 / odds3 : 0;

  // Calculate total probability (includes vig)
  const totalProb = prob1 + prob2 + (odds3 ? prob3 : 0);

  // Calculate vig percentage
  const totalVig = (totalProb - 1) * 100;

  // Calculate true probabilities (normalized)
  const trueProb1 = prob1 / totalProb;
  const trueProb2 = prob2 / totalProb;
  const trueProb3 = odds3 ? prob3 / totalProb : undefined;

  // Calculate fair value
  const fairValue = 100;

  return {
    totalVig,
    fairValue,
    trueProb1,
    trueProb2,
    trueProb3
  };
}

export function convertOdds(value: string, format: string): number {
  if (!value) return 0;

  switch (format) {
    case 'decimal':
      return parseFloat(value);
    case 'american':
      const numValue = parseInt(value);
      if (numValue > 0) {
        return 1 + (numValue / 100);
      } else {
        return 1 - (100 / numValue);
      }
    case 'fractional':
      const [num, den] = value.split('/').map(Number);
      return 1 + (num / den);
    default:
      return 0;
  }
}

export function validateOdds(value: string, format: string): boolean {
  if (!value) return false;

  switch (format) {
    case 'decimal':
      const decimal = parseFloat(value);
      return !isNaN(decimal) && decimal > 1;
    case 'american':
      const american = parseInt(value);
      return !isNaN(american) && american !== 0;
    case 'fractional':
      const parts = value.split('/');
      if (parts.length !== 2) return false;
      const [num, den] = parts.map(Number);
      return !isNaN(num) && !isNaN(den) && den > 0;
    default:
      return false;
  }
}