import React from 'react';
import { CreditCard, Gift, Star, ArrowRight } from 'lucide-react';

export function AccountBilling() {
  return (
    <div className="space-y-8">
      {/* Current Plan */}
      <div className="p-6 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
        border border-[#8000FF]/20 rounded-xl">
        <h3 className="font-urbanist font-bold text-white text-lg mb-6">Current Plan</h3>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center">
                <Star className="w-5 h-5 text-[#8000FF]" />
              </div>
              <div>
                <div className="text-white font-urbanist font-bold">Pro Plan</div>
                <div className="text-white/40 text-sm">$50/month</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Next billing date</span>
                <span className="text-white">April 23, 2024</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Payment method</span>
                <span className="text-white">•••• 4242</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center">
                <Gift className="w-5 h-5 text-[#8000FF]" />
              </div>
              <div>
                <div className="text-white font-urbanist font-bold">Current Savings</div>
                <div className="text-emerald-500">50% OFF</div>
              </div>
            </div>
            <p className="text-white/60 text-sm">
              You're currently saving $50/month with our limited time offer!
            </p>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="p-6 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
        border border-[#8000FF]/20 rounded-xl">
        <h3 className="font-urbanist font-bold text-white text-lg mb-6">Payment Methods</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-[#8000FF]" />
                </div>
                <div>
                  <div className="text-white font-medium">Visa ending in 4242</div>
                  <div className="text-white/40 text-sm">Expires 04/2025</div>
                </div>
              </div>
              <div className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-sm">
                Default
              </div>
            </div>
          </div>

          <button className="w-full h-[42px] bg-[#8000FF]/10 text-[#8000FF] font-urbanist font-bold 
            rounded-xl hover:bg-[#8000FF]/20 transition-all duration-300 flex items-center 
            justify-center gap-2 group">
            <span>Add Payment Method</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Billing History */}
      <div className="p-6 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
        border border-[#8000FF]/20 rounded-xl">
        <h3 className="font-urbanist font-bold text-white text-lg mb-6">Billing History</h3>
        
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-xl bg-[#8000FF]/10 flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-[#8000FF]" />
          </div>
          <h4 className="text-white font-urbanist font-bold mb-2">No Billing History</h4>
          <p className="text-white/60">Your billing history will appear here</p>
        </div>
      </div>
    </div>
  );
}