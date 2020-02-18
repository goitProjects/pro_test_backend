import { examQuestionController } from './examQuestion.controller';
import { Router } from 'express';
import { authMiddleware } from '../auth/auth.middleware';
import { asyncWrapper } from '../helpers/asyncMiddlewareWrapper';
import { examQuestionValidator } from './examQuestion.validator';

export class ExamQuestionRouter {
  static initRouter() {
    const router = Router();

    router.put(
      '/:examId/questions/:examQuestionId/answer/:choiceId',
      authMiddleware.authorize,
      asyncWrapper(examQuestionController.answerQuestion),
    );
    router.put(
      '/:examId/questions',
      authMiddleware.authorize,
      examQuestionValidator.answerExamQuestions,
      asyncWrapper(examQuestionController.answerExamQuestions),
    );

    return router;
  }
}

export const examQuestionRouter = ExamQuestionRouter.initRouter();
