/* eslint-disable require-await */
import { encrypter } from '../helpers/encrypter';

export class UserDao {
  static async createUser(userMeta) {
    userMeta.passwordHash = await encrypter.generatePasswordHash(
      userMeta.password,
    );
    delete userMeta.password;

    return this.create(userMeta);
  }

  static findByEmailOrCreate(email, name) {
    return this.findOneAndUpdate(
      { email },
      { name },
      { new: true, upsert: true },
    );
  }

  static findUserByEmail(email) {
    return this.findOne({ email });
  }

  async isPasswordCorrect(password) {
    const correct = await encrypter.comparePasswordHash(this, password);
    return correct;
  }
}
