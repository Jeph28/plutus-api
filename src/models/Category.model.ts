import { Schema, model, Document } from 'mongoose';
import { ICategory } from '../interfaces/ICategory';

export interface ICategoryDocument extends ICategory, Document {}

const categorySchema = new Schema<ICategoryDocument>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  color: {
    type: String,
    default: '#000000'
  },
  icon: {
    type: String,
    default: 'default-icon'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  isDefault: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Índice compuesto para evitar categorías duplicadas por usuario
categorySchema.index({ name: 1, user: 1, type: 1 }, { unique: true });

export const Category = model<ICategoryDocument>('Category', categorySchema);
