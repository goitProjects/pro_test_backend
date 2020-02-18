module.exports = {
  port: 3000,
  homepage: '',
  mongodb: {
    prodUrl:
      'mongodb+srv://levkiv:1234567890@testcluster-oqqlz.mongodb.net/example?retryWrites=true&w=majority',
    devUrl:
      'mongodb+srv://levkiv:1234567890@testcluster-oqqlz.mongodb.net/exampleTest?retryWrites=true&w=majority',
  },

  swagger: {
    host: 'localhost:3000',
    schemes: ['http'],
  },

  googleOAuth2: {
    clientID: '',
    clientSecret: '',
    callbackURL: '',
  },

  cors: {
    origin: 'http://localhost:3000',
  },

  jwt: {
    secret: '',
    algorithm: '',
  },
};
