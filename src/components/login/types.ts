import { Dispatch, SetStateAction } from 'react';

export type LoginView = 'login' | 'confirmation' | 'forgot-password' | 'reset-sent';

export interface LoginFormData {
  email: string;
  password: string;
  showPassword: boolean;
}

export interface LoginFormProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  error: string | null;
  isLoading: boolean;
  setView: Dispatch<SetStateAction<LoginView>>;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export interface ConfirmationFormProps {
  email: string;
  confirmationCode: string;
  setConfirmationCode: Dispatch<SetStateAction<string>>;
  error: string | null;
  isLoading: boolean;
  setView: Dispatch<SetStateAction<LoginView>>;
  handleConfirmationSubmit: (e: React.FormEvent) => Promise<void>;
}

export interface ForgotPasswordFormProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  error: string | null;
  isLoading: boolean;
  setView: Dispatch<SetStateAction<LoginView>>;
  handleForgotPassword: (e: React.FormEvent) => Promise<void>;
}

export interface ResetSentMessageProps {
  email: string;
  setView: Dispatch<SetStateAction<LoginView>>;
}