import { Types } from 'mongoose';

export interface IAccount {
  name: string;
  type: 'cash' | 'bank' | 'credit' | 'investment' | 'other';
  balance: number;
  currency: string;
  user: Types.ObjectId;
  isActive: boolean;
  bankName?: string;
  accountNumber?: string;
  color?: string;
  icon?: string;
}
