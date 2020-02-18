import { AbstractValidator } from '../helpers/AbstractValidator';
import Validator from 'node-validator';

export class TestValidator extends AbstractValidator {
  constructor() {
    super();
  }

  get createTest() {
    return this._createTest.bind(this)();
  }

  _createTest() {
    const createTestRules = Validator.isObject()
      .withRequired('name', Validator.isString())
      .withRequired('examQuestionsCount', Validator.isNumber())
      .withOptional('description', Validator.isString());

    return this.runMiddleware.bind(this, createTestRules, 'body');
  }
}

export const testValidator = new TestValidator();
