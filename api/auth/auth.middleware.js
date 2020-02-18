import {
  UnauthorizedError,
  ForbiddenError,
} from '../helpers/errorsConstructors';
import { sessionModel } from '../session/session.model';
import jwt from 'jsonwebtoken';
import { jwt as jwtOptions } from '../config';
import { sessionStatuses } from '../session/session.statuses';

export class AuthMiddleware {
  get authorize() {
    return this._authorize.bind(this);
  }
  get role() {
    return this._role.bind(this);
  }

  async _authorize(req, res, next) {
    try {
      await this._checkAuth(req);
      next();
    } catch (err) {
      next(err);
    }
  }

  _role(role) {
    return async (req, res, next) => {
      try {
        await this._checkAuth(req);
        if (role !== req.user.role) {
          throw new ForbiddenError('Not allowed to execute this endpoint');
        }
        next();
      } catch (err) {
        next(err);
      }
    };
  }

  async _checkAuth(req) {
    const authHeader = req.header('Authorization') || '';
    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      throw new UnauthorizedError('Auth token not provided');
    }

    let sessionId = this._verifyToken(token);
    const session = await sessionModel.findSessionById(sessionId);
    if (!session || session.status !== sessionStatuses.ACTIVE) {
      throw new UnauthorizedError('Auth token is not valid');
    }

    req.user = session.user;
    req.token = session.token;
  }

  _verifyToken(token) {
    try {
      const tokenPayload = jwt.verify(token, jwtOptions.secret);
      return tokenPayload.id;
    } catch (err) {
      throw new UnauthorizedError('Auth token is not valid');
    }
  }
}

export const authMiddleware = new AuthMiddleware();
