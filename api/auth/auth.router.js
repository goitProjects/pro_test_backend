import { AuthController } from './auth.controller';
import { AuthValidator } from './auth.validator';
import passport from 'passport';
import { Router } from 'express';
import { authMiddleware } from './auth.middleware';
import { asyncWrapper } from '../helpers/asyncMiddlewareWrapper';

export class AuthRouter {
  static initRouter() {
    const authController = new AuthController();
    const authValidator = new AuthValidator();
    const router = Router();

    router.post(
      '/sign-in',
      authValidator.signIn,
      passport.authenticate('local', { session: false }),
      asyncWrapper(authController.signIn),
    );
    router.post(
      '/sign-up',
      authValidator.signUp,
      asyncWrapper(authController.signUp),
    );
    router.delete(
      '/sign-out',
      authMiddleware.authorize,
      asyncWrapper(authController.signOut),
    );

    router.get(
      '/google',
      passport.authenticate('google', {
        scope: [
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/userinfo.profile',
        ],
        session: false,
      }),
    );
    router.get(
      '/google/callback',
      passport.authenticate('google', {
        failureRedirect: '/',
        session: false,
      }),
      authController.signInGoogle,
    );

    return router;
  }
}

export const authRouter = AuthRouter.initRouter();
