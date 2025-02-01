import { ArrowLeftRight, Sigma, HelpCircle, User, CreditCard } from 'lucide-react';
import type { FAQCategory } from '../components/types';
import type { LucideIcon } from 'lucide-react';

// Create icon components
const icons: Record<string, LucideIcon> = {
  ArrowLeftRight,
  Sigma,
  HelpCircle,
  User,
  CreditCard
};

export const faqData: FAQCategory[] = [
  {
    id: 'arbitrage',
    name: 'Arbitrage',
    icon: icons.ArrowLeftRight,
    description: 'Learn about arbitrage betting strategies and our tools',
    questions: [
      {
        question: 'What is arbitrage betting?',
        answer: 'Arbitrage betting is a strategy where you place bets on all possible outcomes of an event at odds that guarantee a profit regardless of the result. Our platform helps you identify these opportunities across multiple sportsbooks.'
      },
      {
        question: 'How does your arbitrage calculator work?',
        answer: 'Our arbitrage calculator automatically compares odds across multiple sportsbooks in real-time. Simply enter the odds and stake amount, and it will calculate the optimal bet distribution and potential profit.'
      },
      {
        question: 'Are arbitrage opportunities guaranteed profit?',
        answer: 'While arbitrage betting mathematically guarantees profit, there are risks such as odds changing before all bets are placed, or bookmaker limitations. We recommend careful bankroll management and understanding these risks.'
      },
      {
        question: 'How often do arbitrage opportunities occur?',
        answer: 'Arbitrage opportunities occur frequently, especially in popular sports and during live betting. Our platform scans thousands of odds per minute to identify these opportunities as they arise.'
      }
    ]
  },
  {
    id: 'ev',
    name: '+EV',
    icon: icons.Sigma,
    description: 'Understanding Expected Value and profitable betting',
    questions: [
      {
        question: 'What is Expected Value (EV) in betting?',
        answer: 'Expected Value (EV) is a mathematical formula that helps determine the potential profit or loss of a bet over time. A positive EV (+EV) indicates that a bet is profitable in the long run.'
      },
      {
        question: 'How do you calculate Expected Value?',
        answer: 'EV is calculated by multiplying the probability of winning by the amount you could win, then subtracting the probability of losing multiplied by the amount you could lose. Our tools automate this calculation for you.'
      },
      {
        question: 'Why is +EV betting important?',
        answer: 'Focusing on +EV bets is crucial for long-term profitability in sports betting. It ensures you are making mathematically sound decisions rather than relying on gut feelings or hunches.'
      },
      {
        question: 'Can I combine EV and arbitrage betting?',
        answer: 'Yes, many successful bettors use both strategies. While arbitrage provides guaranteed profits, +EV betting can offer larger returns with managed risk. Our platform supports both approaches.'
      }
    ]
  },
  {
    id: 'general',
    name: 'General',
    icon: icons.HelpCircle,
    description: 'Common questions about our platform and services',
    questions: [
      {
        question: 'How do I get started with Summit Stakes?',
        answer: 'Getting started is easy! Simply create a free account, explore our tools and calculators, and begin tracking your bets. We recommend starting with our Betting101 guide for beginners.'
      },
      {
        question: 'Which sports do you cover?',
        answer: 'We cover all major sports including NHL, NBA, NFL, MLB, soccer (multiple leagues), tennis, and more. Our odds comparison includes data from 20+ sportsbooks across these sports.'
      },
      {
        question: 'Is your platform available worldwide?',
        answer: 'Our platform is available in many countries, with region-specific sportsbook coverage and odds. You can check availability in your area through our location selector.'
      },
      {
        question: 'Do you offer mobile apps?',
        answer: 'Currently, we offer a fully responsive web application that works great on all devices. Native mobile apps are in development and coming soon.'
      }
    ]
  },
  {
    id: 'account',
    name: 'Account',
    icon: icons.User,
    description: 'Account management and security information',
    questions: [
      {
        question: 'How do I change my password?',
        answer: 'You can change your password in your account settings. Go to your profile, click on Security, and follow the prompts to update your password.'
      },
      {
        question: 'Can I have multiple accounts?',
        answer: 'No, we allow only one account per user to maintain data integrity and ensure fair usage of our platform.'
      },
      {
        question: 'How do I delete my account?',
        answer: 'Account deletion can be initiated from your account settings. Please note that this action is permanent and will remove all your data.'
      },
      {
        question: 'Is my data secure?',
        answer: 'Yes, we use industry-standard encryption and security measures to protect your data. We never share your personal information with third parties.'
      }
    ]
  },
  {
    id: 'payment',
    name: 'Payment',
    icon: icons.CreditCard,
    description: 'Billing, subscriptions, and payment methods',
    questions: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, PayPal, and various local payment methods depending on your region.'
      },
      {
        question: 'How do refunds work?',
        answer: 'Refund requests are handled on a case-by-case basis. Please contact our support team within 14 days of purchase if you are unsatisfied with our service.'
      },
      {
        question: 'Can I change my subscription plan?',
        answer: 'Yes, you can upgrade or downgrade your subscription at any time. Changes take effect at the start of your next billing cycle.'
      },
      {
        question: 'Are there any hidden fees?',
        answer: 'No, we are completely transparent about our pricing. The price you see is the price you pay, with no hidden fees or charges.'
      }
    ]
  }
];