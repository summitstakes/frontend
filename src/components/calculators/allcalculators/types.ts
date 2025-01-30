export interface Calculator {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  popular?: boolean;
  stat: string;
  color: string;
  features: string[];
}

export interface StatCard {
  icon: React.ReactNode;
  label: string;
  value: string;
}