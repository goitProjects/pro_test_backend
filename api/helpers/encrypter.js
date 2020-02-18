/* eslint-disable no-magic-numbers, require-await */
import bcrypt from 'bcryptjs';

export class Encrypter {
  constructor() {
    this.saltRounds = 5;
  }

  async generatePasswordHash(userPassword) {
    return bcrypt.hash(userPassword, this.saltRounds);
  }

  async comparePasswordHash(user, password) {
    return bcrypt.compare(password, user.passwordHash);
  }
}

export const encrypter = new Encrypter();
