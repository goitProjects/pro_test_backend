export const authEndpoints = {
  '/auth/sign-in': {
    post: {
      tags: ['auth'],
      summary: 'Signs in a user',
      description: '',
      operationId: 'signIn',
      consumes: ['application/json'],
      produces: ['application/json'],
      parameters: [
        {
          in: 'body',
          name: 'Credentials',
          description: 'User credentials for log in',
          required: true,
          schema: {
            $ref: '#/definitions/Credentials',
          },
        },
      ],
      responses: {
        '400': {
          description: 'User request body format is invalid',
        },
        '401': {
          description: 'User provided wrong credentials',
        },
        '201': {
          description: 'User signed-in',
          schema: {
            $ref: '#/definitions/AuthUser',
          },
        },
      },
    },
  },
  '/auth/sign-up': {
    post: {
      tags: ['auth'],
      summary: 'Signs up a user',
      description: '',
      operationId: 'signUp',
      consumes: ['application/json'],
      produces: ['application/json'],
      parameters: [
        {
          in: 'body',
          name: 'SignUpCredentials',
          description: 'User credentials for sign up',
          required: true,
          schema: {
            $ref: '#/definitions/SignUpCredentials',
          },
        },
      ],
      responses: {
        '409': {
          description: 'User has already signed-up',
        },
        '201': {
          description: 'User signed-up',
          schema: {
            $ref: '#/definitions/AuthUser',
          },
        },
      },
    },
  },
  '/auth/google': {
    get: {
      tags: ['auth'],
      summary: 'Endpoint, which redirects user to google OAuth',
      description:
        'WARNING!!! This endpoint should not be tested through swagger UI. At the response returns "token" cookie which should be then written to localStorage',
      operationId: 'signIn',
      responses: {
        '302': {
          description: 'Redirection to google sign-in page',
        },
      },
    },
  },
  '/auth/sign-out': {
    delete: {
      tags: ['auth'],
      summary: 'Endpoint, which disables current session',
      description: '',
      operationId: 'signOut',
      parameters: [
        {
          in: 'header',
          name: 'Authorization',
          description: 'User authorization token with "Bearer " prefix',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        '204': {
          description: 'User successfully logged out',
        },
        '401': {
          description: 'User session does not exist or already disabled',
        },
      },
    },
  },
};

export const authDefinitions = {
  Credentials: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    },
  },
  SignUpCredentials: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
    },
  },

  AuthUser: {
    type: 'object',
    properties: {
      user: {
        $ref: '#/definitions/User',
      },
      token: {
        type: 'string',
      },
    },
    xml: {
      name: 'AuthUser',
    },
  },
};
