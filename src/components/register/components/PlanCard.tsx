import React from 'react';
import { Check, ArrowRight, Flame, Trophy, Gift, Sparkles } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import { PlanCardProps } from '../types';

export function PlanCard({ plan, selectedPlan, onSelect }: PlanCardProps) {
  return (
    <div
      onClick={() => onSelect(plan.type)}
      className={`relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer
        hover:-translate-y-1 group
        ${plan.type === 'pro' 
          ? 'hover:shadow-[0_8px_32px_-6px_rgba(128,0,255,0.4)]' 
          : 'hover:shadow-[0_8px_16px_-6px_rgba(128,0,255,0.2)]'}
        ${selectedPlan === plan.type
          ? plan.type === 'pro' 
            ? 'bg-gradient-to-br from-[#8000FF]/30 to-[#8000FF]/10 border-[#8000FF]' 
            : 'bg-[#8000FF]/20 border-[#8000FF]'
          : 'bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] border-[#8000FF]/20'
        }`}
    >
      {/* Popular Badge for Pro Plan */}
      {plan.popular && (
        <div className="absolute -top-3 -right-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8000FF] to-[#A855F7] blur-lg opacity-50" />
            <div className="relative flex flex-col">
              <div className="px-4 py-1.5 bg-gradient-to-r from-[#8000FF] to-[#A855F7] rounded-full
                flex items-center gap-2 shadow-lg">
                <Flame className="w-4 h-4 text-white animate-pulse" />
                <span className="text-white text-sm font-bold tracking-wide">MOST POPULAR</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Plan Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center
            ${selectedPlan === plan.type 
              ? 'bg-[#8000FF]/30' 
              : 'bg-[#8000FF]/10'
            } group-hover:scale-110 transition-transform duration-500`}>
            <div className="text-[#8000FF]">{plan.icon}</div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-urbanist font-bold text-lg text-white">{plan.name}</h3>
              {/* No Credit Card Badge for Free Plan */}
              {plan.type === 'free' && (
                <div className="px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20
                  flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-500 text-[10px] font-medium whitespace-nowrap">No credit card</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {plan.type === 'pro' && (
                <span className="text-lg text-white/40 line-through">$100</span>
              )}
              <div className="flex items-center gap-1">
                <span className="text-xl font-urbanist font-bold text-white">{plan.price}</span>
                <span className="text-white/60 text-sm">/month</span>
              </div>
            </div>
          </div>
        </div>
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
          ${selectedPlan === plan.type
            ? 'border-[#8000FF] bg-[#8000FF]'
            : 'border-white/20'
          }`}>
          {selectedPlan === plan.type && (
            <Check className="w-3 h-3 text-white" />
          )}
        </div>
      </div>

      {/* Savings Badge for Pro Plan */}
      {plan.savings && (
        <div className="mb-4 px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 
          rounded-lg flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span className="text-emerald-500 text-sm font-medium text-center">{plan.savings}</span>
        </div>
      )}

      <div className="space-y-3">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center
              ${selectedPlan === plan.type 
                ? 'bg-[#8000FF]' 
                : 'bg-[#8000FF]/20'
              }`}>
              <Check className="w-3 h-3 text-white" />
            </div>
            <span className={selectedPlan === plan.type ? 'text-white' : 'text-white/60'}>
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* Enhanced Telegram CTA for Free Plan */}
      {plan.telegramCta && (
        <div className="mt-6 pt-6 border-t border-[#8000FF]/20">
          <div className="mb-4 px-3 py-2 bg-[#8000FF]/10 border border-[#8000FF]/20 
            rounded-lg flex items-center justify-center gap-2">
            <Gift className="w-4 h-4 text-[#8000FF] animate-pulse" />
            <span className="text-[#8000FF] text-sm font-medium text-center">FREE DAILY ARBS ON TELEGRAM!</span>
          </div>
          <p className="text-white/80 text-sm mb-3">
            Not convinced yet? Join our Telegram channel for daily arbitrage opportunities and betting insights!
          </p>
          <button className="w-full h-[42px] bg-[#8000FF]/10 text-white font-urbanist font-bold 
            rounded-xl hover:bg-[#8000FF]/20 transition-all duration-300 flex items-center 
            justify-center gap-2 group/btn">
            <FontAwesomeIcon icon={faTelegram} className="w-5 h-5" />
            <span>Join 10K+ Members</span>
            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {/* Pro Plan Extra Info */}
      {plan.type === 'pro' && (
        <div className="mt-6 pt-6 border-t border-[#8000FF]/20">
          <div className="flex items-center gap-2 text-[#8000FF]">
            <Trophy className="w-4 h-4" />
            <span className="text-sm font-medium">Recommended by Pro Bettors</span>
          </div>
        </div>
      )}
    </div>
  );
}