import { Schema, model, Document } from 'mongoose';
import { IAccount } from '../interfaces/IAccount';

export interface IAccountDocument extends IAccount, Document {}

const accountSchema = new Schema<IAccountDocument>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['cash', 'bank', 'credit', 'investment', 'other'],
    required: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0
  },
  currency: {
    type: String,
    required: true,
    default: 'USD'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  bankName: {
    type: String,
    trim: true
  },
  accountNumber: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    default: '#000000'
  },
  icon: {
    type: String,
    default: 'default-icon'
  }
}, {
  timestamps: true
});

// Índice compuesto para evitar cuentas duplicadas por usuario
accountSchema.index({ name: 1, user: 1 }, { unique: true });

// Middleware para validar el número de cuenta si el tipo es 'bank'
accountSchema.pre('save', function(next) {
  if (this.type === 'bank' && !this.accountNumber) {
    next(new Error('Account number is required for bank accounts'));
  }
  next();
});

export const Account = model<IAccountDocument>('Account', accountSchema);
