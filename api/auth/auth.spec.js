// eslint-disable-next-line no-global-assign
require = require('esm')(module);
require('should');
const { WalletServer } = require('../server');
const request = require('supertest-promised');
const {
  UNAUTHORIZED,
  CREATED,
  CONFLICT,
  NO_CONTENT,
  BAD_REQUEST,
} = require('http-status-codes');
const { userModel } = require('../user/user.model');
const { sessionModel } = require('../session/session.model');
const { sessionStatuses } = require('../session/session.statuses');
const { encrypter } = require('../helpers/encrypter');
const jwt = require('jsonwebtoken');
const {
  jwt: { secret: jwtSecret, algorithm: jwtAlgorithm },
} = require('../config');

describe('Auth API', () => {
  let server;
  let walletServer;

  before(async () => {
    walletServer = new WalletServer();
    await walletServer.start();
    await walletServer.clearDb();
    server = walletServer.server;
  });

  after(() => {
    server.close();
  });

  describe('POST /sign-in', () => {
    context('when invalid parameters', () => {
      it('should throw 400 error', async () => {
        await request(server)
          .post('/api/auth/sign-in')
          .set('Content-Type', 'application/json')
          .send({
            email: 'nonexistent_user@email.com',
            password: 'password',
            wrongProp: 'hello',
          })
          .expect(BAD_REQUEST)
          .end();
      });
    });

    context('when there is no user with such email', () => {
      it('should throw 401 error', async () => {
        await request(server)
          .post('/api/auth/sign-in')
          .set('Content-Type', 'application/json')
          .send({
            email: 'nonexistent_user@email.com',
            password: 'wrong_password',
          })
          .expect(UNAUTHORIZED)
          .end();
      });
    });

    context('when checking password', () => {
      let email = 'existent@email.com';
      let password = 'right_password';

      before(async () => {
        await userModel.create({
          name: 'username',
          email,
          passwordHash: await encrypter.generatePasswordHash(password),
        });
      });

      after(async () => {
        await walletServer.clearDb();
      });

      it('should throw 401 error if password is wrong', async () => {
        await request(server)
          .post('/api/auth/sign-in')
          .set('Content-Type', 'application/json')
          .send({
            email,
            password: 'wrong_password',
          })
          .expect(UNAUTHORIZED)
          .end();
      });

      it('should return 201 if password is correct', async () => {
        const responseBody = await request(server)
          .post('/api/auth/sign-in')
          .set('Content-Type', 'application/json')
          .send({
            email,
            password,
          })
          .expect(CREATED)
          .end()
          .get('body');

        responseBody.should.have
          .property('user')
          .which.have.properties('id', 'name', 'email', 'createdAt');

        responseBody.should.have.property('token').which.is.a.String();
      });
    });
  });

  describe('POST /sign-up', () => {
    let email = 'existent_user@email.com';
    let password = 'correct_password';

    context('when invalid parameters', () => {
      it('should throw 400 error', async () => {
        await request(server)
          .post('/api/auth/sign-up')
          .set('Content-Type', 'application/json')
          .send({
            email: 'nonexistent_user@email.com',
            password: 'password',
          })
          .expect(BAD_REQUEST)
          .end();
      });
    });

    context('when there is no user with such email', () => {
      after(async () => {
        await walletServer.clearDb();
      });

      it('should send 201 code', async () => {
        await request(server)
          .post('/api/auth/sign-up')
          .set('Content-Type', 'application/json')
          .send({
            name: 'username',
            email,
            password,
          })
          .expect(CREATED)
          .end();
      });
    });

    context('when there is a user with such email', () => {
      before(async () => {
        await userModel.create({
          name: 'username',
          email,
          passwordHash: await encrypter.generatePasswordHash(password),
        });
      });

      after(async () => {
        await walletServer.clearDb();
      });

      it('should throw 409 error', async () => {
        await request(server)
          .post('/api/auth/sign-up')
          .set('Content-Type', 'application/json')
          .send({
            email,
            password,
            name: 'username',
          })
          .expect(CONFLICT)
          .end()
          .get('body');
      });
    });
  });

  describe('DELETE /sign-out', () => {
    context('when token is not valid or session disabled', () => {
      it('should throw 401 error', async () => {
        await request(server)
          .delete('/api/auth/sign-out')
          .send()
          .expect(UNAUTHORIZED)
          .end();
      });
    });

    context('when trying to logout from active session', () => {
      let rightToken;
      let sessionId;

      before(async () => {
        const user = await userModel.create({
          email: 'test@email.com',
        });
        const session = await sessionModel.create({
          userId: user._id,
          token: rightToken,
        });
        sessionId = session._id;

        rightToken = jwt.sign({ id: session._id }, jwtSecret, {
          algorithm: jwtAlgorithm,
        });
      });

      after(async () => {
        await walletServer.clearDb();
      });

      it('should return 204', async () => {
        await request(server)
          .delete('/api/auth/sign-out')
          .set('Authorization', `Bearer ${rightToken}`)
          .send()
          .expect(NO_CONTENT)
          .end();

        const disabledSession = await sessionModel.findOne({ _id: sessionId });
        disabledSession.status.should.be.eql(sessionStatuses.DISABLED);
      });
    });
  });
});
