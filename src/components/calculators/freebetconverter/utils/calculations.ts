export function calculateFreeBetConversion(
  backOdds: number,
  layOdds: number,
  freeBetAmount: number,
  commission: number
): ResultsData {
  // Convert commission to decimal
  const commissionRate = commission / 100;

  // Calculate lay stake
  const layStake = (freeBetAmount * (backOdds - 1)) / (layOdds - commissionRate);

  // Calculate liability
  const liability = layStake * (layOdds - 1);

  // Calculate profit if back bet wins
  const backWinProfit = freeBetAmount * (backOdds - 1) - liability;

  // Calculate profit if lay bet wins
  const layWinProfit = layStake * (1 - commissionRate) - freeBetAmount;

  // Use the lower profit to determine conversion rate
  const guaranteedProfit = Math.min(backWinProfit, layWinProfit);
  const conversionRate = (guaranteedProfit / freeBetAmount) * 100;

  return {
    freeBetAmount,
    layStake,
    liability,
    conversionRate,
    convertedAmount: guaranteedProfit
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

export function formatCurrency(value: number, symbol: string): string {
  return `${symbol}${value.toFixed(2)}`;
}