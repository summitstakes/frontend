import { Crown, Star } from 'lucide-react';
import { Plan } from '../types';

export const plans: Plan[] = [
  {
    type: 'free',
    name: 'Free',
    price: '$0',
    icon: <Crown className="w-6 h-6" />,
    features: [
      'Basic odds comparison',
      'Limited bet tracking',
      'Community access',
      'Email support'
    ],
    telegramCta: true
  },
  {
    type: 'pro',
    name: 'Pro',
    price: '$50',
    icon: <Star className="w-6 h-6" />,
    popular: true,
    features: [
      'Advanced arbitrage tools',
      'Unlimited bet tracking',
      'Priority support',
      'Real-time alerts',
      'Pro community access',
      'Advanced analytics'
    ],
    savings: '50% OFF - Limited Time!'
  }
];