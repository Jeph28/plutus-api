import { Router } from 'express';
import { TransactionController } from '../controllers/Transaction.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const transactionController = new TransactionController();

router.post('/', authMiddleware, transactionController.create);
router.get('/', authMiddleware, transactionController.getAll);

export default router;
