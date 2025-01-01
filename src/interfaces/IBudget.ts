import { Types } from 'mongoose';

export interface IBudgetItem {
  category: Types.ObjectId;
  amount: number;
  spent: number;
}

export interface IBudget {
  user: Types.ObjectId;
  name: string;
  period: {
    month: number;
    year: number;
  };
  items: IBudgetItem[];
  totalBudget: number;
  totalSpent: number;
  isActive: boolean;
  notifications?: {
    enabled: boolean;
    threshold: number;
    email?: string;
  };
}
