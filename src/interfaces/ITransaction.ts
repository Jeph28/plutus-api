
import { Types } from 'mongoose';

export interface ITransaction {
  user: Types.ObjectId;
  type: 'income' | 'expense';
  amount: number;
  category: Types.ObjectId;
  description?: string;
  date: Date;
  account: Types.ObjectId;
  attachments?: string[];
}
