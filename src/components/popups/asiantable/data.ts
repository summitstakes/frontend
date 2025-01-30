import { HandicapRow } from './types';

export const handicapRows: HandicapRow[] = [
  { 
    negative: '0.00',
    positive: '0.00',
    outcomes: [
      {
        teamA: 'Won',
        resultA: 'Won',
        teamB: 'Lost',
        resultB: 'Lost'
      },
      {
        teamA: 'Tied',
        resultA: 'Stake Refunded',
        teamB: 'Tied',
        resultB: 'Stake Refunded'
      },
      {
        teamA: 'Lost',
        resultA: 'Lost',
        teamB: 'Won',
        resultB: 'Won'
      }
    ]
  },
  { 
    negative: '-0.25',
    positive: '+0.25',
    outcomes: [
      {
        teamA: 'Won',
        resultA: 'Won',
        teamB: 'Lost',
        resultB: 'Lost'
      },
      {
        teamA: 'Tied',
        resultA: 'Half Lose',
        teamB: 'Tied',
        resultB: 'Half Win'
      },
      {
        teamA: 'Lost',
        resultA: 'Lost',
        teamB: 'Won',
        resultB: 'Won'
      }
    ]
  },
  { 
    negative: '-0.50',
    positive: '+0.50',
    outcomes: [
      {
        teamA: 'Won',
        resultA: 'Won',
        teamB: 'Lost',
        resultB: 'Lost'
      },
      {
        teamA: 'Tied',
        resultA: 'Lost',
        teamB: 'Tied',
        resultB: 'Won'
      },
      {
        teamA: 'Lost',
        resultA: 'Lost',
        teamB: 'Won',
        resultB: 'Won'
      }
    ]
  },
  { 
    negative: '-0.75',
    positive: '+0.75',
    outcomes: [
      {
        teamA: 'Won by 2+',
        resultA: 'Won',
        teamB: 'Lost by 2+',
        resultB: 'Lost'
      },
      {
        teamA: 'Won by 1',
        resultA: 'Half Win',
        teamB: 'Lost by 1',
        resultB: 'Half Lose'
      },
      {
        teamA: 'Tied',
        resultA: 'Lost',
        teamB: 'Tied',
        resultB: 'Won'
      },
      {
        teamA: 'Lost',
        resultA: 'Lost',
        teamB: 'Won',
        resultB: 'Won'
      }
    ]
  },
  { 
    negative: '-1.00',
    positive: '+1.00',
    outcomes: [
      {
        teamA: 'Won by 2+',
        resultA: 'Won',
        teamB: 'Lost by 2+',
        resultB: 'Lost'
      },
      {
        teamA: 'Won by 1',
        resultA: 'Stake Refunded',
        teamB: 'Lost by 1',
        resultB: 'Stake Refunded'
      },
      {
        teamA: 'Tied',
        resultA: 'Lost',
        teamB: 'Tied',
        resultB: 'Won'
      },
      {
        teamA: 'Lost',
        resultA: 'Lost',
        teamB: 'Won',
        resultB: 'Won'
      }
    ]
  },
  { 
    negative: '-1.25',
    positive: '+1.25',
    outcomes: [
      {
        teamA: 'Won by 2+',
        resultA: 'Won',
        teamB: 'Lost by 2+',
        resultB: 'Lost'
      },
      {
        teamA: 'Won by 1',
        resultA: 'Half Lose',
        teamB: 'Lost by 1',
        resultB: 'Half Win'
      },
      {
        teamA: 'Tied',
        resultA: 'Lost',
        teamB: 'Tied',
        resultB: 'Won'
      },
      {
        teamA: 'Lost',
        resultA: 'Lost',
        teamB: 'Won',
        resultB: 'Won'
      }
    ]
  },
  { 
    negative: '-1.50',
    positive: '+1.50',
    outcomes: [
      {
        teamA: 'Won by 2+',
        resultA: 'Won',
        teamB: 'Lost by 2+',
        resultB: 'Lost'
      },
      {
        teamA: 'Won by 1',
        resultA: 'Lost',
        teamB: 'Lost by 1',
        resultB: 'Won'
      },
      {
        teamA: 'Tied',
        resultA: 'Lost',
        teamB: 'Tied',
        resultB: 'Won'
      },
      {
        teamA: 'Lost',
        resultA: 'Lost',
        teamB: 'Won',
        resultB: 'Won'
      }
    ]
  },
  { 
    negative: '-1.75',
    positive: '+1.75',
    outcomes: [
      {
        teamA: 'Won by 3+',
        resultA: 'Won',
        teamB: 'Lost by 3+',
        resultB: 'Lost'
      },
      {
        teamA: 'Won by 2',
        resultA: 'Half Win',
        teamB: 'Lost by 2',
        resultB: 'Half Lose'
      },
      {
        teamA: 'Won by 1',
        resultA: 'Lost',
        teamB: 'Lost by 1',
        resultB: 'Won'
      },
      {
        teamA: 'Tied',
        resultA: 'Lost',
        teamB: 'Tied',
        resultB: 'Won'
      },
      {
        teamA: 'Lost',
        resultA: 'Lost',
        teamB: 'Won',
        resultB: 'Won'
      }
    ]
  },
  { 
    negative: '-2.00',
    positive: '+2.00',
    outcomes: [
      {
        teamA: 'Won by 3+',
        resultA: 'Won',
        teamB: 'Lost by 3+',
        resultB: 'Lost'
      },
      {
        teamA: 'Won by 2',
        resultA: 'Stake Refunded',
        teamB: 'Lost by 2',
        resultB: 'Stake Refunded'
      },
      {
        teamA: 'Won by 1',
        resultA: 'Lost',
        teamB: 'Lost by 1',
        resultB: 'Won'
      },
      {
        teamA: 'Tied',
        resultA: 'Lost',
        teamB: 'Tied',
        resultB: 'Won'
      },
      {
        teamA: 'Lost',
        resultA: 'Lost',
        teamB: 'Won',
        resultB: 'Won'
      }
    ]
  }
];