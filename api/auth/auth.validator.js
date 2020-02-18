import { AbstractValidator } from '../helpers/AbstractValidator';
import Validator from 'node-validator';

export class AuthValidator extends AbstractValidator {
  constructor() {
    super();
  }

  get signUp() {
    return this._signUp.bind(this)();
  }
  get signIn() {
    return this._signIn.bind(this)();
  }

  _signUp() {
    const signUpRules = Validator.isObject()
      .withRequired('name', Validator.isString())
      .withRequired('email', Validator.isString({ regex: /@/ }))
      .withRequired('password', Validator.isString());

    return this.runMiddleware.bind(this, signUpRules, 'body');
  }

  _signIn() {
    const signInRules = Validator.isObject()
      .withRequired('email', Validator.isString({ regex: /@/ }))
      .withRequired('password', Validator.isString());

    return this.runMiddleware.bind(this, signInRules, 'body');
  }
}
