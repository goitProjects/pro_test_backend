import { UserController } from './user.controller';
import { Router } from 'express';
import { authMiddleware } from '../auth/auth.middleware';

export class UserRouter {
  static initRouter() {
    const userController = new UserController();
    const router = Router();

    router.get(
      '/current',
      authMiddleware.authorize,
      userController.getLoggedUser,
    );

    return router;
  }
}

export const userRouter = UserRouter.initRouter();
