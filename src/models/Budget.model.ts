import { Schema, model, Document } from 'mongoose';
import { IBudget, IBudgetItem } from '../interfaces/IBudget';

export interface IBudgetDocument extends IBudget, Document {
  updateSpentAmount(categoryId: string, amount: number): Promise<void>;
  getRemainingBudget(): number;
  getPercentageUsed(): number;
}

const budgetItemSchema = new Schema<IBudgetItem>({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  spent: {
    type: Number,
    default: 0,
    min: 0
  }
});

const budgetSchema = new Schema<IBudgetDocument>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  period: {
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12
    },
    year: {
      type: Number,
      required: true,
      min: 2000
    }
  },
  items: [budgetItemSchema],
  totalBudget: {
    type: Number,
    required: true,
    min: 0
  },
  totalSpent: {
    type: Number,
    default: 0,
    min: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  notifications: {
    enabled: {
      type: Boolean,
      default: true
    },
    threshold: {
      type: Number,
      default: 80,
      min: 1,
      max: 100
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    }
  }
}, {
  timestamps: true
});

// Índice compuesto para evitar presupuestos duplicados por usuario y período
budgetSchema.index({ user: 1, 'period.month': 1, 'period.year': 1 }, { unique: true });

// Método para actualizar el monto gastado de una categoría
budgetSchema.methods.updateSpentAmount = async function(
  categoryId: string,
  amount: number
): Promise<void> {
  const budgetItem = this.items.find(
    (item: IBudgetItem) => item.category.toString() === categoryId
  );

  if (budgetItem) {
    budgetItem.spent += amount;
    this.totalSpent += amount;
    await this.save();
  }
};

// Método para obtener el presupuesto restante
budgetSchema.methods.getRemainingBudget = function(): number {
  return this.totalBudget - this.totalSpent;
};

// Método para obtener el porcentaje utilizado
budgetSchema.methods.getPercentageUsed = function(): number {
  return (this.totalSpent / this.totalBudget) * 100;
};

// Middleware para calcular el totalBudget antes de guardar
budgetSchema.pre('save', function(next) {
  if (this.isModified('items')) {
    this.totalBudget = this.items.reduce((sum, item) => sum + item.amount, 0);
  }
  next();
});

// Middleware para validar que el presupuesto no sea negativo
budgetSchema.pre('save', function(next) {
  if (this.totalBudget < 0) {
    next(new Error('Total budget cannot be negative'));
  }
  if (this.totalSpent < 0) {
    next(new Error('Total spent cannot be negative'));
  }
  next();
});

// Método estático para encontrar presupuestos activos que exceden el umbral
budgetSchema.statics.findOverThreshold = function() {
  return this.find({
    isActive: true,
    $expr: {
      $gte: [
        { $multiply: [{ $divide: ['$totalSpent', '$totalBudget'] }, 100] },
        '$notifications.threshold'
      ]
    }
  }).populate('user');
};

export const Budget = model<IBudgetDocument>('Budget', budgetSchema);
