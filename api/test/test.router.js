import { testValidator } from './test.validator';
import { Router } from 'express';
import { authMiddleware } from '../auth/auth.middleware';
import { testController } from './test.controller';
import { userRoles } from '../user/role.const';
import { asyncWrapper } from '../helpers/asyncMiddlewareWrapper';

export class TestRouter {
  static initRouter() {
    const router = Router();

    router.post(
      '/',
      authMiddleware.role(userRoles.ADMIN),
      testValidator.createTest,
      asyncWrapper(testController.createTest),
    );
    router.put(
      '/:testId/publish',
      authMiddleware.role(userRoles.ADMIN),
      asyncWrapper(testController.publishTest),
    );
    router.delete(
      '/:testId',
      authMiddleware.role(userRoles.ADMIN),
      asyncWrapper(testController.deleteTest),
    );
    router.get(
      '/',
      authMiddleware.role(userRoles.ADMIN),
      asyncWrapper(testController.getTestList),
    );
    router.get(
      '/:testId',
      authMiddleware.role(userRoles.ADMIN),
      asyncWrapper(testController.getTest),
    );
    router.get(
      '/published',
      authMiddleware.authorize,
      asyncWrapper(testController.getPublishedTestList),
    );

    return router;
  }
}

export const testRouter = TestRouter.initRouter();
