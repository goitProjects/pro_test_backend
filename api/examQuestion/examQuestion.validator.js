import { AbstractValidator } from '../helpers/AbstractValidator';
import Validator from 'node-validator';

export class ExamQuestionValidator extends AbstractValidator {
  constructor() {
    super();
  }

  get answerExamQuestions() {
    return this._answerExamQuestions.bind(this)();
  }

  _answerExamQuestions() {
    const answerRules = Validator.isObject()
      .withRequired('examQuestionId', Validator.isString())
      .withOptional('choiceId', Validator.isNumber());
    const answerExamQuestionsRules = Validator.isObject().withRequired(
      'answers',
      Validator.isArray(answerRules),
    );

    return this.runMiddleware.bind(this, answerExamQuestionsRules, 'body');
  }
}

export const examQuestionValidator = new ExamQuestionValidator();
