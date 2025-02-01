import type { LucideIcon } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  questions: FAQItem[];
}

export interface CategoryListProps {
  categories: FAQCategory[];
  activeCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

export interface QuestionListProps {
  category: FAQCategory | null;
  expandedQuestions: string[];
  onQuestionToggle: (question: string) => void;
  helpfulQuestions: Set<string>;
  unhelpfulQuestions: Set<string>;
  onHelpfulClick: (question: string, isHelpful: boolean) => void;
  onCopyLink: (question: string) => void;
  copiedQuestion: string | null;
}