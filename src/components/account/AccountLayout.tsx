import React from 'react';
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { User, CreditCard, Settings, HelpCircle, Bell } from 'lucide-react';
import { AccountOverview } from './pages/AccountOverview';
import { AccountBilling } from './pages/AccountBilling';
import { AccountSettings } from './pages/AccountSettings';
import { AccountNotifications } from './pages/AccountNotifications';
import { AccountHelp } from './pages/AccountHelp';

const menuItems = [
  { icon: <User />, label: 'Overview', path: '/account' },
  { icon: <CreditCard />, label: 'Billing', path: '/account/billing' },
  { icon: <Settings />, label: 'Settings', path: '/account/settings' },
  { icon: <Bell />, label: 'Notifications', path: '/account/notifications' },
  { icon: <HelpCircle />, label: 'Help', path: '/account/help' }
];

export function AccountLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#06060C] -mt-[120px] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-[20%] w-[600px] h-[600px] bg-[#8000FF]/10 rounded-full 
          blur-[120px] animate-pulse mix-blend-screen" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-[20%] w-[500px] h-[500px] bg-[#8000FF]/10 rounded-full 
          blur-[100px] animate-pulse mix-blend-screen" style={{ animationDuration: '6s' }} />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative">
        {/* Header Section */}
        <div className="pt-[160px] pb-12">
          <h1 className="text-4xl sm:text-6xl font-urbanist font-extrabold text-white mb-6 leading-tight">
            Account
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8000FF] to-[#A855F7]
              animate-gradient relative">
              Settings
              <div className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r 
                from-transparent via-[#8000FF] to-transparent opacity-50" />
            </span>
          </h1>
          
          <p className="text-white/60 text-xl leading-relaxed mb-8 max-w-2xl">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-[280px_1fr] gap-8 pb-24">
          {/* Sidebar Navigation */}
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`h-[52px] px-4 rounded-xl flex items-center gap-3 transition-all
                  ${location.pathname === item.path
                    ? 'bg-[#8000FF] text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
              >
                <div className="w-5 h-5">{item.icon}</div>
                <span className="font-urbanist font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Content Area */}
          <div className="min-h-[600px]">
            <Routes>
              <Route path="/" element={<AccountOverview />} />
              <Route path="/billing" element={<AccountBilling />} />
              <Route path="/settings" element={<AccountSettings />} />
              <Route path="/notifications" element={<AccountNotifications />} />
              <Route path="/help" element={<AccountHelp />} />
              <Route path="*" element={<Navigate to="/account" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}