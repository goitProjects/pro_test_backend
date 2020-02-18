import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { userModel } from '../user/user.model';
import { googleOAuth2 } from '../config';
import { sessionModel } from '../session/session.model';

export class PassportStrategies {
  get initStrategies() {
    return this._initStrategies.bind(this);
  }

  _initStrategies() {
    this.initLocalStrategy();
    this.initGoogleStrategy();
  }

  initLocalStrategy() {
    passport.use(
      new LocalStrategy(
        {
          usernameField: 'email',
          passwordField: 'password',
        },
        async (email, password, done) => {
          try {
            const user = await userModel.findUserByEmail(email);
            if (!user || !(await user.isPasswordCorrect(password))) {
              return done(null, false);
            }

            return done(null, user);
          } catch (err) {
            done(err);
          }
        },
      ),
    );
  }

  initGoogleStrategy() {
    const { clientID, clientSecret, callbackURL } = googleOAuth2;

    passport.use(
      new GoogleStrategy(
        {
          clientID: clientID,
          clientSecret: clientSecret,
          callbackURL: callbackURL,
        },
        async (accessToken, refreshToken, profile, done) => {
          const { displayName, email } = profile;
          const user = await userModel.findByEmailOrCreate(email, displayName);
          const session = await sessionModel.createSession(user, accessToken);

          done(null, { user, session });
        },
      ),
    );
  }
}

export const passportStrategies = new PassportStrategies();
