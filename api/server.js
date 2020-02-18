import express from 'express';
import bodyParser from 'body-parser';
import { promisify } from 'util';
import mongoose from 'mongoose';
import config from './config';
import { testRouter } from './test/test.router';
import { examRouter } from './exam/exam.router';
import { authRouter } from './auth/auth.router';
import { passportStrategies } from './auth/passport.strategies';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/index';
import { questionRouter } from './question/question.router';
import { examQuestionRouter } from './examQuestion/examQuestion.router';
import { userRouter } from './user/user.router';
import cors from 'cors';

export class WalletServer {
  constructor() {
    this.app = express();
    this.config = config;
  }

  async start() {
    this.initMiddlewares();
    await this.initDb();
    this.initRoutes();

    this.startListening();
  }

  initMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cors({ origin: config.cors.origin }));
  }

  initRoutes() {
    passportStrategies.initStrategies();
    this.app.use(express.static('static'));
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    this.app.use('/api/auth', authRouter);
    this.app.use('/api/tests', testRouter);
    this.app.use('/api/exams', examRouter);
    this.app.use('/api/tests', questionRouter);
    this.app.use('/api/exams', examQuestionRouter);
    this.app.use('/api/users', userRouter);
  }

  async initDb() {
    const { prodUrl, devUrl } = this.config.mongodb;
    const dbUrl = process.env.NODE_ENV === 'production' ? prodUrl : devUrl;
    const connectPromise = promisify(mongoose.connect.bind(mongoose));

    try {
      await connectPromise(dbUrl);
      console.log('Connected to mongodb with url', dbUrl);
    } catch (err) {
      console.log('Failed to connect to mongodb', err);
    }
  }

  async clearDb() {
    try {
      await mongoose.connection.db.dropDatabase();
      console.log('Cleared up database');
    } catch (err) {
      console.log('Error occured when tried to clear MongoDB', err);
    }
  }

  startListening() {
    this.server = this.app.listen(this.config.port, () => {
      console.log('Server started on port', this.config.port);
    });
  }
}
