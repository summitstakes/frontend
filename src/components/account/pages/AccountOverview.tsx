import React, { useState, useEffect } from 'react';
import { User, Mail, Globe2, Star, Shield, Clock, Calendar } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

export function AccountOverview() {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          
          setProfile({
            ...user,
            ...profile
          });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="w-12 h-12 rounded-xl bg-[#8000FF]/10 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-[#8000FF] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Profile Overview */}
      <div className="p-6 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
        border border-[#8000FF]/20 rounded-xl">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-2xl bg-[#8000FF]/10 flex items-center justify-center">
            <User className="w-10 h-10 text-[#8000FF]" />
          </div>
          <div>
            <h2 className="text-2xl font-urbanist font-bold text-white mb-2">
              {profile?.first_name} {profile?.last_name}
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#8000FF]/10">
                <Star className="w-4 h-4 text-[#8000FF]" />
                <span className="text-[#8000FF] text-sm font-medium">Pro Member</span>
              </div>
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <Clock className="w-4 h-4" />
                <span>Member since {new Date(profile?.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Account Details */}
          <div className="space-y-4">
            <h3 className="font-urbanist font-bold text-white text-lg mb-4">Account Details</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#8000FF]" />
                </div>
                <div>
                  <div className="text-white/40 text-sm">Email Address</div>
                  <div className="text-white font-medium">{profile?.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center">
                  <Globe2 className="w-5 h-5 text-[#8000FF]" />
                </div>
                <div>
                  <div className="text-white/40 text-sm">Location</div>
                  <div className="text-white font-medium">{profile?.country || 'Not set'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="space-y-4">
            <h3 className="font-urbanist font-bold text-white text-lg mb-4">Account Status</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#8000FF]" />
                </div>
                <div>
                  <div className="text-white/40 text-sm">Account Type</div>
                  <div className="text-white font-medium capitalize">
                    {profile?.plan?.replace('_plan', '') || 'Free'} Plan
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#8000FF]/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#8000FF]" />
                </div>
                <div>
                  <div className="text-white/40 text-sm">Next Billing Date</div>
                  <div className="text-white font-medium">
                    {profile?.plan === 'pro_plan' ? 'April 23, 2024' : 'No active subscription'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-6 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
        border border-[#8000FF]/20 rounded-xl">
        <h3 className="font-urbanist font-bold text-white text-lg mb-6">Recent Activity</h3>
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-xl bg-[#8000FF]/10 flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-[#8000FF]" />
          </div>
          <h4 className="text-white font-urbanist font-bold mb-2">No Recent Activity</h4>
          <p className="text-white/60">Your recent account activity will appear here</p>
        </div>
      </div>
    </div>
  );
}