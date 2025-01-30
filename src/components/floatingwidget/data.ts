export const oddsFormats = [
  { id: 'american', label: 'American', example: '-110', description: 'Most common in North America' },
  { id: 'decimal', label: 'Decimal', example: '1.91', description: 'Popular in Europe and Australia' },
  { id: 'fractional', label: 'Fractional', example: '10/11', description: 'Traditional UK format' },
  { id: 'hongkong', label: 'Hong Kong', example: '0.91', description: 'Popular in Asian markets' },
  { id: 'indonesian', label: 'Indonesian', example: '-1.10', description: 'Common in Southeast Asia' },
  { id: 'malay', label: 'Malaysian', example: '0.91', description: 'Used in Malaysian betting' }
];

// Common timezones with UTC offsets
export const timezones = [
  { id: 'local', label: 'Local Time', value: Intl.DateTimeFormat().resolvedOptions().timeZone },
  { id: 'ET', label: 'Eastern Time (ET)', value: 'America/New_York' },
  { id: 'CT', label: 'Central Time (CT)', value: 'America/Chicago' },
  { id: 'MT', label: 'Mountain Time (MT)', value: 'America/Denver' },
  { id: 'PT', label: 'Pacific Time (PT)', value: 'America/Los_Angeles' },
  { id: 'GMT', label: 'GMT', value: 'GMT' },
  { id: 'BST', label: 'British Time (BST)', value: 'Europe/London' },
  { id: 'CET', label: 'Central European Time', value: 'Europe/Paris' },
  { id: 'IST', label: 'India Time (IST)', value: 'Asia/Kolkata' },
  { id: 'CST', label: 'China Time (CST)', value: 'Asia/Shanghai' },
  { id: 'JST', label: 'Japan Time (JST)', value: 'Asia/Tokyo' },
  { id: 'AEDT', label: 'Australian Eastern Time', value: 'Australia/Sydney' }
];