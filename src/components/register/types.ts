// Types shared across register components
export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  language: string;
  password: string;
  confirmPassword: string;
  acceptPolicy: boolean;
}

export interface Plan {
  type: 'free' | 'pro';
  name: string;
  price: string;
  icon: React.ReactNode;
  features: string[];
  popular?: boolean;
  savings?: string;
  telegramCta?: boolean;
}

export interface PlanCardProps {
  plan: Plan;
  selectedPlan: 'free' | 'pro';
  onSelect: (type: 'free' | 'pro') => void;
}

export interface SignUpFormProps {
  selectedPlan: 'free' | 'pro';
  isLoading: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}