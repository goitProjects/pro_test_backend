import { AbstractValidator } from '../helpers/AbstractValidator';
import Validator from 'node-validator';

export class ExamValidator extends AbstractValidator {
  constructor() {
    super();
  }

  get startExam() {
    return this._startExam.bind(this)();
  }

  _startExam() {
    const startExamRules = Validator.isObject().withRequired(
      'testId',
      Validator.isString(),
    );

    return this.runMiddleware.bind(this, startExamRules, 'query');
  }
}

export const examValidator = new ExamValidator();
