import { authDefinitions, authEndpoints } from './auth.docs';
import { swagger } from '../config';
import { examEndpoints, examDefinitions } from './exam.docs';
import {
  examQuestionDefinitions,
  examQuestionEndpoints,
} from './examQuestion.docs';
import { testEndpoints, testDefinitions } from './test.docs';
import { questionEndpoints, questionDefinitions } from './question.docs';
import { userDefinitions, userEndpoints } from './user.docs';

export default {
  swagger: '2.0',
  info: {
    description: '',
    version: '1.0.0',
    title: 'Wallet Docs',
    contact: {
      email: 'mykola.levkiv@gmail.com',
    },
  },
  host: swagger.host,
  basePath: '/api',
  tags: [],
  schemes: swagger.schemes,
  paths: {
    ...authEndpoints,
    ...examEndpoints,
    ...testEndpoints,
    ...questionEndpoints,
    ...examQuestionEndpoints,
    ...userEndpoints,
  },
  definitions: {
    ...authDefinitions,
    ...examDefinitions,
    ...examQuestionDefinitions,
    ...testDefinitions,
    ...questionDefinitions,
    ...examQuestionDefinitions,
    ...userDefinitions,
  },
};
