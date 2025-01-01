import { Router } from 'express';
import { BudgetController } from '../controllers/Budget.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const budgetController = new BudgetController();

router.post('/', authMiddleware, budgetController.create);
router.get('/', authMiddleware, budgetController.getAll);

export default router;
