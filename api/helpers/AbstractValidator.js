import Validator from 'node-validator';
import { ValidationError } from '../helpers/errorsConstructors';

export class AbstractValidator {
  run(rules, objToValidate) {
    return new Promise((res, rej) => {
      Validator.run(rules, objToValidate, (errCount, errors) => {
        if (!errCount) {
          return res(objToValidate);
        }

        const validationError = new ValidationError(JSON.stringify(errors));
        rej(validationError);
      });
    });
  }

  async runMiddleware(rules, reqTarget, req, res, next) {
    try {
      const target = req[reqTarget];
      await this.run(rules, target);
      next();
    } catch (err) {
      next(err);
    }
  }
}
