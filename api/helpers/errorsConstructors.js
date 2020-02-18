/* eslint-disable max-classes-per-file */
import {
  BAD_REQUEST,
  NOT_FOUND,
  CONFLICT,
  UNAUTHORIZED,
  FORBIDDEN,
} from 'http-status-codes';

export class AbstractError extends Error {
  constructor(name, statusCode, message) {
    super();
    this.name = name;
    this.status = statusCode;
    this.message = message;
    delete this.stack;
  }
}

export class ValidationError extends AbstractError {
  constructor(message) {
    super('ValidationError', BAD_REQUEST, message);
  }
}

export class NotFoundError extends AbstractError {
  constructor(message) {
    super('NotFoundError', NOT_FOUND, message);
  }
}

export class ConflictError extends AbstractError {
  constructor(message) {
    super('ConflictError', CONFLICT, message);
  }
}

export class ForbiddenError extends AbstractError {
  constructor(message) {
    super('ForbiddenError', FORBIDDEN, message);
  }
}

export class UnauthorizedError extends AbstractError {
  constructor(message) {
    super('UnauthorizedError', UNAUTHORIZED, message);
  }
}
