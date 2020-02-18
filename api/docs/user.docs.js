export const userEndpoints = {
  '/users/current': {
    get: {
      tags: ['user'],
      summary: 'Get logged user',
      description: '',
      operationId: 'getLoggedUser',
      produces: ['application/json'],
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
        '401': {
          description: 'Token is not valid or disabled',
        },
        '200': {
          description: 'Return logged in user',
          schema: {
            $ref: '#/definitions/User',
          },
        },
      },
    },
  },
};

export const userDefinitions = {
  User: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
      createdAt: {
        type: 'string',
      },
    },
    xml: {
      name: 'User',
    },
  },
};
