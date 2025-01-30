import React, { useState, useEffect } from 'react';
import { User, Mail, Globe2, Languages, Lock, Loader2, Check } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useNotification } from '../../notifications/NotificationProvider';

export function AccountSettings() {
  const { showNotification } = useNotification();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    language: ''
  });

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

          setFormData({
            firstName: profile?.first_name || '',
            lastName: profile?.last_name || '',
            email: user.email || '',
            country: profile?.country || '',
            language: profile?.language || ''
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
          country: formData.country,
          language: formData.language
        })
        .eq('id', profile.id);

      if (error) throw error;

      showNotification('Profile updated successfully', 'success');
    } catch (error) {
      console.error('Error updating profile:', error);
      showNotification('Failed to update profile', 'error');
    } finally {
      setIsSaving(false);
    }
  };

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
      {/* Profile Settings */}
      <div className="p-6 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
        border border-[#8000FF]/20 rounded-xl">
        <h3 className="font-urbanist font-bold text-white text-lg mb-6">Profile Settings</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white/60">First Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full h-[42px] bg-white/5 border border-white/10 rounded-xl pl-12 pr-4
                    text-white placeholder:text-white/20 focus:outline-none focus:border-[#8000FF]/40
                    focus:ring-1 focus:ring-[#8000FF]/40 transition-all"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white/60">Last Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full h-[42px] bg-white/5 border border-white/10 rounded-xl pl-12 pr-4
                    text-white placeholder:text-white/20 focus:outline-none focus:border-[#8000FF]/40
                    focus:ring-1 focus:ring-[#8000FF]/40 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-white/60">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full h-[42px] bg-white/5 border border-white/10 rounded-xl pl-12 pr-4
                  text-white/60 focus:outline-none cursor-not-allowed"
              />
            </div>
          </div>

          {/* Country & Language */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white/60">Country</label>
              <div className="relative">
                <Globe2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full h-[42px] bg-white/5 border border-white/10 rounded-xl pl-12 pr-4
                    text-white focus:outline-none focus:border-[#8000FF]/40 focus:ring-1 
                    focus:ring-[#8000FF]/40 transition-all appearance-none"
                >
                  <option value="" className="bg-[#120D1D]">Select country</option>
                  <option value="CA" className="bg-[#120D1D]">Canada</option>
                  <option value="US" className="bg-[#120D1D]">United States</option>
                  <option value="GB" className="bg-[#120D1D]">United Kingdom</option>
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white/60">Language</label>
              <div className="relative">
                <Languages className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full h-[42px] bg-white/5 border border-white/10 rounded-xl pl-12 pr-4
                    text-white focus:outline-none focus:border-[#8000FF]/40 focus:ring-1 
                    focus:ring-[#8000FF]/40 transition-all appearance-none"
                >
                  <option value="" className="bg-[#120D1D]">Select language</option>
                  <option value="en" className="bg-[#120D1D]">English</option>
                  <option value="fr" className="bg-[#120D1D]">Français</option>
                  <option value="es" className="bg-[#120D1D]">Español</option>
                </select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={isSaving}
            className="w-full h-[48px] bg-[#8000FF] text-white font-urbanist font-bold rounded-xl
              hover:bg-[#6700CC] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300
              hover:shadow-[0_0_20px_rgba(128,0,255,0.3)] relative overflow-hidden group"
          >
            {isSaving ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : (
              <>
                <div className="absolute inset-0 flex items-center justify-center bg-[#6700CC] 
                  translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Check className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="group-hover:translate-y-[-150%] transition-transform duration-300 block">
                  Save Changes
                </span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Password Settings */}
      <div className="p-6 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
        border border-[#8000FF]/20 rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-urbanist font-bold text-white text-lg">Password Settings</h3>
          <button className="h-[42px] px-6 bg-[#8000FF]/10 text-[#8000FF] font-urbanist font-bold 
            rounded-xl hover:bg-[#8000FF]/20 transition-all duration-300 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            <span>Change Password</span>
          </button>
        </div>

        <p className="text-white/60">
          Your password was last changed on {new Date(profile?.updated_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}