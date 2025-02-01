import { FormData } from '../types';

export function calculateArbitrage(odds1: number, odds2: number, stake1: number = 0) {
  // Convert odds to decimal if needed
  const decimalOdds1 = odds1;
  const decimalOdds2 = odds2;

  // Calculate implied probabilities
  const impliedProb1 = 1 / decimalOdds1;
  const impliedProb2 = 1 / decimalOdds2;
  const totalImpliedProb = impliedProb1 + impliedProb2;

  // Check if arbitrage exists
  const hasArbitrage = totalImpliedProb < 1;

  // Calculate optimal stakes and returns
  const totalStake = stake1 || 1000; // Use 1000 as default total stake
  const stake2 = (totalStake * decimalOdds1) / decimalOdds2;

  // Calculate potential returns
  const return1 = stake1 * decimalOdds1;
  const return2 = stake2 * decimalOdds2;

  // Calculate profit and ROI
  const totalInvestment = stake1 + stake2;
  const guaranteedReturn = Math.min(return1, return2);
  const totalProfit = guaranteedReturn - totalInvestment;
  const roi = (totalProfit / totalInvestment) * 100;

  return {
    hasArbitrage,
    totalInvestment,
    totalProfit,
    roi,
    impliedProb1: impliedProb1 * 100,
    impliedProb2: impliedProb2 * 100,
    optimalStake1: stake1,
    optimalStake2: stake2,
    potentialReturn1: return1,
    potentialReturn2: return2
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

export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}