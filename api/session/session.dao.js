/* eslint-disable require-await */
import { sessionStatuses } from './session.statuses';
import mongoose from 'mongoose';
const {
  Types: { ObjectId },
} = mongoose;

export class SessionDao {
  constructor() {
    this.tokenSaltLength = 16;
  }

  static async createSession(user) {
    return this.create({ userId: user._id });
  }

  static async findSessionById(id) {
    if (!ObjectId.isValid(id)) {
      return null;
    }
    return this.findOne({ _id: id }).populate('user');
  }

  static async disableSession(token) {
    return this.updateOne(
      {
        token,
      },
      {
        status: sessionStatuses.DISABLED,
      },
    );
  }
}
