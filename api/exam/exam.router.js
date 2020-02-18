import { examValidator } from './exam.validator';
import { examController } from './exam.controller';
import { Router } from 'express';
import { authMiddleware } from '../auth/auth.middleware';
import { asyncWrapper } from '../helpers/asyncMiddlewareWrapper';

export class ExamRouter {
  static initRouter() {
    const router = Router();

    // get all test results for user
    router.post(
      '/start',
      authMiddleware.authorize,
      examValidator.startExam,
      asyncWrapper(examController.startExam),
    );
    router.put(
      '/:examId/finish',
      authMiddleware.authorize,
      asyncWrapper(examController.finishExam),
    );
    router.get(
      '/:examId',
      authMiddleware.authorize,
      asyncWrapper(examController.getExamStatus),
    );
    router.get(
      '/:examId/result',
      authMiddleware.authorize,
      asyncWrapper(examController.getExamResults),
    );

    return router;
  }
}

export const examRouter = ExamRouter.initRouter();
