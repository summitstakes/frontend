import { Session } from '@supabase/supabase-js';
import { Database } from '../../../lib/database.types';

export type Profile = Database['public']['Tables']['profiles']['Row'];

export interface MenuItem {
  name: string;
  hasDropdown?: boolean;
  path?: string;
  dropdownItems?: DropdownItem[];
}

export interface DropdownItem {
  name: string;
  icon: React.ReactNode | string;
  path?: string;
  isTemp?: boolean;
}

export interface Language {
  code: string;
  name: string;
  region: string;
}

export interface NavBarProps {
  className?: string;
}

export interface MenuItemProps {
  item: MenuItem;
  isActive: boolean;
  activeDropdown: string | null;
  onHover: (name: string | null) => void;
  onLeave: () => void;
  onClick: (item: MenuItem) => void;
  onDropdownHover: () => void;
  onDropdownLeave: () => void;
}

export interface AccountButtonProps {
  session: Session | null;
  profile: Profile | null;
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  onSignOut: () => Promise<void>;
  isLoading: boolean;
}

export interface LanguageSelectorProps {
  activeLang: string;
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  onLanguageChange: (code: string) => void;
  languages: Language[];
}