import { CREATED, MOVED_TEMPORARILY, NO_CONTENT } from 'http-status-codes';
import { authDto } from './auth.dto';
const { composeAuthUser } = authDto;
import { sessionModel } from '../session/session.model';
import { userModel } from '../user/user.model';
import { ConflictError } from '../helpers/errorsConstructors';
import { homepage } from '../config';
import jwt from 'jsonwebtoken';
import { jwt as jwtOptions } from '../config';

export class AuthController {
  get signIn() {
    return this._signIn.bind(this);
  }
  get signInGoogle() {
    return this._signInGoogle.bind(this);
  }
  get signUp() {
    return this._signUp.bind(this);
  }
  get signOut() {
    return this._signOut.bind(this);
  }

  async _signIn(req, res) {
    const user = req.user;

    const session = await sessionModel.createSession(user);
    const token = this._createToken(session._id);

    return res.status(CREATED).json(composeAuthUser(user, token));
  }

  async _signUp(req, res) {
    const { email } = req.body;
    const existingUser = await userModel.findUserByEmail(email);

    if (existingUser) {
      throw new ConflictError('User already exists!');
    }

    const newUser = await userModel.createUser(req.body);
    const session = await sessionModel.createSession(newUser);
    const token = this._createToken(session._id);

    res.status(CREATED).json(composeAuthUser(newUser, token));
  }

  _signInGoogle(req, res) {
    const { session } = req.user;
    const token = this._createToken(session._id);

    return res.redirect(
      MOVED_TEMPORARILY,
      `${homepage}?token=${encodeURIComponent(token)}`,
    );
  }

  async _signOut(req, res) {
    await sessionModel.disableSession(req.token);
    return res.status(NO_CONTENT).send();
  }

  _createToken(sessionId) {
    return jwt.sign({ id: sessionId }, jwtOptions.secret, {
      algorithm: jwtOptions.algorithm,
    });
  }
}

export const authController = new AuthController();
