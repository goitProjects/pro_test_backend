// eslint-disable-next-line no-global-assign
require = require('esm')(module);
require('should');
const { WalletServer } = require('../server');
const request = require('supertest-promised');
const { OK, UNAUTHORIZED } = require('http-status-codes');
const { sessionModel } = require('../session/session.model');
const { userModel } = require('../user/user.model');
const { authController } = require('../auth/auth.controller');

describe('User API', () => {
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

  describe('GET /current', () => {
    context('when there is no auth token', () => {
      it('should throw 401 error', async () => {
        await request(server)
          .get('/api/users/current')
          .set('Content-Type', 'application/json')
          .send()
          .expect(UNAUTHORIZED)
          .end();
      });
    });

    context('when we do not have session with provided token', () => {
      it('should throw 401 error', async () => {
        await request(server)
          .get('/api/users/current')
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer wrong_token')
          .send()
          .expect(UNAUTHORIZED)
          .end();
      });
    });

    context('when session with that token exists', () => {
      let rightToken;

      before(async () => {
        const user = await userModel.create({
          email: 'test@email.com',
        });
        const session = await sessionModel.create({
          userId: user._id,
          token: rightToken,
        });

        rightToken = authController._createToken(session._id);
      });

      after(async () => {
        await walletServer.clearDb();
      });

      it('should return successfull response', async () => {
        await request(server)
          .get('/api/users/current')
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${rightToken}`)
          .send()
          .expect(OK)
          .end();
      });
    });
  });
});
