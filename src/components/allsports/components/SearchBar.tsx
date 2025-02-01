import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearching: boolean;
}

export function SearchBar({ searchQuery, setSearchQuery, isSearching }: SearchBarProps) {
  return (
    <div className="mb-6">
      <div className="relative">
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors
          ${isSearching ? 'text-[#8000FF]' : 'text-white/40'}`} />
        <input
          type="text"
          placeholder="Search sports or leagues..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-[52px] bg-white/5 border border-white/10 rounded-xl pl-12 pr-4
            text-white placeholder:text-white/40 focus:outline-none focus:border-[#8000FF]/40
            focus:ring-1 focus:ring-[#8000FF]/40 transition-all"
        />
        {isSearching && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-[#8000FF] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}