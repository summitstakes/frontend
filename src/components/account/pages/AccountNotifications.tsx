import React from 'react';
import { Bell, Mail, MessageSquare } from 'lucide-react';

export function AccountNotifications() {
  return (
    <div className="space-y-8">
      {/* Email Notifications */}
      <div className="p-6 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
        border border-[#8000FF]/20 rounded-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center">
            <Mail className="w-5 h-5 text-[#8000FF]" />
          </div>
          <div>
            <h3 className="font-urbanist font-bold text-white text-lg">Email Notifications</h3>
            <p className="text-white/60 text-sm">Manage your email preferences</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { label: 'Arbitrage Opportunities', description: 'Get notified about new arbitrage opportunities' },
            { label: 'Odds Updates', description: 'Receive updates when odds change significantly' },
            { label: 'Pro Insights', description: 'Get notified about new betting insights' },
            { label: 'Account Updates', description: 'Important updates about your account' }
          ].map((setting, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium mb-1">{setting.label}</div>
                <div className="text-white/60 text-sm">{setting.description}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={index === 3} />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer 
                  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-['']
                  after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full
                  after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8000FF]" />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Push Notifications */}
      <div className="p-6 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
        border border-[#8000FF]/20 rounded-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center">
            <Bell className="w-5 h-5 text-[#8000FF]" />
          </div>
          <div>
            <h3 className="font-urbanist font-bold text-white text-lg">Push Notifications</h3>
            <p className="text-white/60 text-sm">Manage your browser notifications</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { label: 'Live Alerts', description: 'Real-time notifications for important events' },
            { label: 'Price Alerts', description: 'Get notified when odds reach your target' },
            { label: 'Browser Notifications', description: 'Enable desktop notifications' }
          ].map((setting, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium mb-1">{setting.label}</div>
                <div className="text-white/60 text-sm">{setting.description}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={index === 0} />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer 
                  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-['']
                  after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full
                  after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8000FF]" />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Communication Preferences */}
      <div className="p-6 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
        border border-[#8000FF]/20 rounded-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-[#8000FF]" />
          </div>
          <div>
            <h3 className="font-urbanist font-bold text-white text-lg">Communication Preferences</h3>
            <p className="text-white/60 text-sm">Manage how we communicate with you</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { label: 'Product Updates', description: 'News about product and feature updates' },
            { label: 'Tips & Tutorials', description: 'Tips on getting more out of Summit Stakes' },
            { label: 'User Research', description: 'Get involved in our product research' },
            { label: 'Marketing Communications', description: 'Offers and promotions from us' }
          ].map((setting, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium mb-1">{setting.label}</div>
                <div className="text-white/60 text-sm">{setting.description}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={index < 2} />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer 
                  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-['']
                  after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full
                  after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8000FF]" />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}