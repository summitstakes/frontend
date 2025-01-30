export function convertOdds(value: string, format: string): number {
  if (!value) return 0;

  try {
    switch (format) {
      case 'decimal':
        const decimal = parseFloat(value);
        if (isNaN(decimal) || decimal <= 1) throw new Error('Invalid decimal odds');
        return decimal;
        
      case 'american':
        const american = parseInt(value);
        if (isNaN(american) || american === 0) throw new Error('Invalid American odds');
        return american > 0 
          ? 1 + (american / 100)
          : 1 - (100 / american);
        
      case 'fractional':
        const [num, den] = value.split('/').map(Number);
        if (isNaN(num) || isNaN(den) || den === 0) throw new Error('Invalid fractional odds');
        return 1 + (num / den);
        
      default:
        throw new Error('Invalid odds format');
    }
  } catch (error) {
    console.error('Conversion error:', error);
    return 0;
  }
}

export function validateOdds(value: string, format: string): boolean {
  if (!value) return false;

  try {
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
  } catch {
    return false;
  }
}

export function decimalToAmerican(decimal: number): string {
  if (decimal <= 1) return '0';
  
  try {
    if (decimal >= 2) {
      return `+${Math.round((decimal - 1) * 100)}`;
    } else {
      return `-${Math.round(100 / (decimal - 1))}`;
    }
  } catch (error) {
    console.error('Conversion error:', error);
    return '0';
  }
}

export function decimalToFractional(decimal: number): string {
  if (decimal <= 1) return '0/1';
  
  try {
    const tolerance = 1.0E-6;
    let numerator = Math.round((decimal - 1) * 100);
    let denominator = 100;
    
    // Simplify fraction
    const gcd = (a: number, b: number): number => {
      return b < tolerance ? a : gcd(b, a % b);
    };
    
    const divisor = gcd(numerator, denominator);
    numerator = Math.round(numerator / divisor);
    denominator = Math.round(denominator / divisor);
    
    return `${numerator}/${denominator}`;
  } catch (error) {
    console.error('Conversion error:', error);
    return '0/1';
  }
}