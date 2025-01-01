import { Router } from 'express';
import { UserController } from '../controllers/User.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import * as UserSchemas from '../schemas/user.shema';

const router = Router();
const userController = new UserController();

router.get(
  '/:id',
  authMiddleware,
  validateRequest(UserSchemas.getUser),
  userController.getById,
);

router.get('/', authMiddleware, userController.getAll);

router.post(
  '/',
  authMiddleware,
  validateRequest(UserSchemas.createUserSchema),
  userController.create,
);

router.put('/:id', authMiddleware, userController.update);

router.delete('/:id', authMiddleware, userController.delete);

export default router;
