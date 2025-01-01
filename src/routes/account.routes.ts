import { Router } from 'express';
import { AccountController } from '../controllers/Account.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const accountController = new AccountController();

router.post('/', authMiddleware, accountController.create);
router.get('/', authMiddleware, accountController.getAll);

export default router;
