import { Router } from 'express';
import transactionRoutes from './transaction.routes';
import accountRoutes from './account.routes';
import categoryRoutes from './category.routes';
import budgetRoutes from './budget.routes';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'welcome to my server v1',
  });
});

router.use('/transaction', transactionRoutes);
router.use('/account', accountRoutes);
router.use('/category', categoryRoutes);
router.use('/budget', budgetRoutes);
router.use('/user', userRoutes);
router.use('/auth', authRoutes);

export default router;
