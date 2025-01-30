import { ReactNode } from 'react';

export interface PremiumTool {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  path?: string;
  popular?: boolean;
  stat: string;
}

export interface FreeTool {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  path: string;
}