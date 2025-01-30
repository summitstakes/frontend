import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { MenuItemProps } from '../types';

export function MenuItem({
  item,
  isActive,
  activeDropdown,
  onHover,
  onLeave,
  onClick,
  onDropdownHover,
  onDropdownLeave
}: MenuItemProps) {
  const navigate = useNavigate();

  return (
    <div 
      className="relative"
      onMouseEnter={() => onHover(item.name)}
      onMouseLeave={onLeave}
    >
      <button 
        onClick={() => onClick(item)}
        className={`relative px-5 h-[42px] rounded-xl flex items-center gap-1.5 group
          transition-all duration-300 shrink-0 overflow-hidden
          ${isActive 
            ? 'bg-[#8000FF]/10 border border-[#8000FF]/20' 
            : 'hover:bg-white/[0.02]'}`}
        aria-expanded={activeDropdown === item.name}
        aria-controls={item.hasDropdown ? `dropdown-${item.name}` : undefined}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#8000FF]/0 via-[#8000FF]/5 
          to-[#8000FF]/0 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <span className={`text-white/60 font-urbanist text-[15px] font-bold 
          group-hover:text-white transition-colors whitespace-nowrap relative z-10
          ${isActive ? '!text-[#8000FF]' : ''}`}>
          {item.name}
        </span>
        {item.hasDropdown && (
          <ChevronDown className={`w-4 h-4 transition-all duration-300 relative z-10
            ${isActive ? 'text-[#8000FF]' : 'text-white/40 group-hover:text-white/60'}
            ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
        )}

        <div className={`absolute bottom-0 left-3 right-3 h-[2px] bg-[#8000FF] 
          transition-transform origin-center duration-300
          ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
      </button>

      {/* Dropdown Menu */}
      {item.hasDropdown && activeDropdown === item.name && (
        <div 
          id={`dropdown-${item.name}`}
          className="absolute top-[calc(100%+4px)] left-1/2 -translate-x-1/2 w-[240px] 
            bg-gradient-to-br from-[#1A1527]/95 to-[#120D1D]/95 backdrop-blur-md
            border border-[#8000FF]/20 rounded-xl shadow-lg overflow-hidden z-50
            animate-in fade-in slide-in-from-top-2 duration-200"
          onMouseEnter={onDropdownHover}
          onMouseLeave={onDropdownLeave}
          role="menu"
        >
          {item.dropdownItems?.map((dropdownItem) => (
            <button
              key={dropdownItem.name}
              onClick={() => {
                if (dropdownItem.path) {
                  navigate(dropdownItem.path);
                }
                onClick(item);
              }}
              className="w-full h-[52px] px-5 text-left hover:bg-[#8000FF]/10 transition-all
                flex items-center gap-4 group/item relative overflow-hidden"
              role="menuitem"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#8000FF]/0 via-[#8000FF]/5 
                to-[#8000FF]/0 opacity-0 group-hover/item:opacity-100 transition-opacity" />
              
              <div className="w-9 h-9 rounded-lg bg-[#8000FF]/10 flex items-center justify-center
                group-hover/item:bg-[#8000FF]/20 transition-all duration-300 relative">
                {typeof dropdownItem.icon === 'string' ? (
                  <span className="text-lg transform group-hover/item:scale-110 
                    transition-transform duration-300">
                    {dropdownItem.icon}
                  </span>
                ) : (
                  <div className="transform group-hover/item:scale-110 
                    transition-transform duration-300">
                    {dropdownItem.icon}
                  </div>
                )}
              </div>

              <div className="flex-1 flex items-center justify-between min-w-0">
                <span className="text-white/60 font-urbanist text-[15px] font-bold
                  group-hover/item:text-white transition-colors truncate">
                  {dropdownItem.name}
                </span>
                <ChevronDown className="w-4 h-4 text-white/40 rotate-[-90deg] 
                  group-hover/item:text-white/60 group-hover/item:translate-x-1
                  transition-all duration-300" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}