import { AbstractValidator } from '../helpers/AbstractValidator';
import Validator from 'node-validator';

export class QuestionValidator extends AbstractValidator {
  constructor() {
    super();
  }

  get createQuestion() {
    return this._createQuestion.bind(this)();
  }

  _createQuestion() {
    const choiceRules = Validator.isObject()
      .withRequired('title', Validator.isString())
      .withOptional('isRight', Validator.isBoolean());

    const createQuestionRules = Validator.isObject()
      .withRequired('question', Validator.isString())
      .withRequired('choices', Validator.isArray(choiceRules, { min: 2 }));

    return this.runMiddleware.bind(this, createQuestionRules, 'body');
  }
}

export const questionValidator = new QuestionValidator();
