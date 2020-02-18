export const testEndpoints = {
  '/tests': {
    post: {
      tags: ['test'],
      summary: 'Create new test. Access only for admins',
      description: '',
      operationId: 'createTest',
      consumes: ['application/json'],
      produces: ['application/json'],
      parameters: [
        {
          in: 'body',
          name: 'test',
          description: 'Metadata for test creation',
          required: true,
          schema: {
            $ref: '#/definitions/TestRequest',
          },
        },
        {
          in: 'header',
          name: 'Authorization',
          description: 'User authorization token with "Bearer " prefix',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        '400': {
          description: 'invalid arguments provided',
        },
        '401': {
          description: 'authorization failed',
        },
        '403': {
          description: 'permission denied',
        },
        '201': {
          description: 'Successfully created test',
          schema: {
            $ref: '#/definitions/TestResponse',
          },
        },
      },
    },
    get: {
      tags: ['test'],
      summary: 'Get tests list. Access only for admins',
      description: '',
      operationId: 'getTestList',
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
          description: 'authorization failed',
        },
        '403': {
          description: 'permission denied',
        },
        '200': {
          description: 'Successfully retreived tests',
          schema: {
            $ref: '#/definitions/TestsListResponse',
          },
        },
      },
    },
  },
  '/tests/published': {
    get: {
      tags: ['test'],
      summary: 'Get published tests list',
      description: '',
      operationId: 'getPublishedTestList',
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
          description: 'authorization failed',
        },
        '200': {
          description: 'Successfully retreived tests',
          schema: {
            $ref: '#/definitions/TestsListResponse',
          },
        },
      },
    },
  },
  '/tests/{testId}/publish': {
    put: {
      tags: ['test'],
      summary: 'Publish test. Access only for admins',
      description: '',
      operationId: 'publishTest',
      produces: ['application/json'],
      parameters: [
        {
          in: 'header',
          name: 'Authorization',
          description: 'User authorization token with "Bearer " prefix',
          required: true,
          type: 'string',
        },
        {
          in: 'path',
          name: 'testId',
          description: 'Id of test, which should be published',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        '401': {
          description: 'authorization failed',
        },
        '403': {
          description: 'permission denied',
        },
        '404': {
          description: 'test not found',
        },
        '204': {
          description: 'Successfully published test',
        },
      },
    },
  },
  '/tests/{testId}': {
    delete: {
      tags: ['test'],
      summary:
        'Remove existing test and all related questions. Existing exam results would remain untouched. Access only for admins',
      description: '',
      operationId: 'deleteTest',
      produces: ['application/json'],
      parameters: [
        {
          in: 'path',
          name: 'testId',
          description: 'Id of test, which should be removed',
          required: true,
          schema: {
            type: 'string',
          },
        },
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
          description: 'authorization failed',
        },
        '403': {
          description: 'permission denied',
        },
        '204': {
          description: 'Successfully removed test',
        },
      },
    },
    get: {
      tags: ['test'],
      summary:
        'Retreive existing test and all related questions. Access only for admins',
      description: '',
      operationId: 'getTest',
      produces: ['application/json'],
      parameters: [
        {
          in: 'path',
          name: 'testId',
          description: 'Id of test, which should be removed',
          required: true,
          schema: {
            type: 'string',
          },
        },
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
          description: 'authorization failed',
        },
        '403': {
          description: 'permission denied',
        },
        '404': {
          description: 'test not found',
        },
        '200': {
          description: 'Successfully retreive test',
          schema: {
            $ref: '#/definitions/TestWithQuestionsResponse',
          },
        },
      },
    },
  },
};

export const testDefinitions = {
  TestWithQuestionsResponse: {
    type: 'object',
    properties: {
      test: {
        $ref: '#/definitions/TestResponse',
      },
      questions: {
        type: 'array',
        items: {
          $ref: '#/definitions/Question',
        },
      },
    },
  },
  TestsListResponse: {
    type: 'object',
    properties: {
      tests: {
        type: 'array',
        items: {
          $ref: '#/definitions/TestRequest',
        },
      },
    },
  },
  TestRequest: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      examQuestionsCount: {
        type: 'integer',
        format: 'int32',
      },
      description: {
        type: 'string',
      },
    },
    xml: {
      name: 'TestRequest',
    },
  },
  TestResponse: {
    type: 'object',
    properties: {
      test: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          authorId: { type: 'string' },
          examQuestionsCount: {
            type: 'integer',
            format: 'int32',
          },
          description: {
            type: 'string',
          },
          published: {
            type: 'boolean',
          },
        },
      },
    },
    xml: {
      name: 'TestResponse',
    },
  },
};
