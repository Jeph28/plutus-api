import { Types } from 'mongoose';

export interface ICategory {
  name: string;
  type: 'income' | 'expense';
  color?: string;
  icon?: string;
  user: Types.ObjectId;
  parent?: string;
  isDefault: boolean;
}
