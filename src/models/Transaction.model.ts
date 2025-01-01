import { Schema, model, Document } from 'mongoose';
import { ITransaction } from '../interfaces/ITransaction';

export interface ITransactionDocument extends ITransaction, Document {}

const transactionSchema = new Schema<ITransactionDocument>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  description: String,
  date: {
    type: Date,
    default: Date.now
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  attachments: [{
    type: String
  }]
}, {
  timestamps: true
});

export const Transaction = model<ITransactionDocument>('Transaction', transactionSchema);
