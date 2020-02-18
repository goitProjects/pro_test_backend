import { questionController } from './question.controller';
import { questionValidator } from './question.validator';
import { Router } from 'express';
import { authMiddleware } from '../auth/auth.middleware';
import { userRoles } from '../user/role.const';
import { asyncWrapper } from '../helpers/asyncMiddlewareWrapper';

export class QuestionRouter {
  static initRouter() {
    const router = Router();

    router.get(
      '/:testId/questions',
      authMiddleware.role(userRoles.ADMIN),
      asyncWrapper(questionController.getTestQuestions),
    );
    router.post(
      '/:testId/questions',
      authMiddleware.role(userRoles.ADMIN),
      questionValidator.createQuestion,
      asyncWrapper(questionController.createQuestion),
    );
    router.delete(
      '/:testId/questions/:questionId',
      authMiddleware.role(userRoles.ADMIN),
      asyncWrapper(questionController.deleteQuestion),
    );

    return router;
  }
}

export const questionRouter = QuestionRouter.initRouter();
