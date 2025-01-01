import { Router } from 'express';
import { CategoryController } from '../controllers/Category.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const categoryController = new CategoryController();

router.post('/', authMiddleware, categoryController.create);
router.get('/', authMiddleware, categoryController.getAll);

export default router;
