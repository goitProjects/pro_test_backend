export const questionEndpoints = {
  '/tests/{testId}/questions': {
    get: {
      tags: ['question'],
      summary:
        'Get all pull of questions for specified test id. Access only for admins',
      description: '',
      operationId: 'getTestQuestions',
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
          description: 'test not found for provided test id',
        },
        '200': {
          description: 'Successfully fetched questions for test',
          schema: {
            $ref: '#/definitions/QuestionsResponse',
          },
        },
      },
    },
    post: {
      tags: ['question'],
      summary:
        'Create new question for specified test id. Access only for admins',
      description: '',
      operationId: 'createQuestion',
      consumes: ['application/json'],
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
        {
          in: 'body',
          name: 'CreateQuestionRequest',
          description: 'Metadata for test question creation',
          required: true,
          schema: {
            $ref: '#/definitions/CreateQuestionRequest',
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
        '201': {
          description: 'Successfully created test',
          schema: {
            $ref: '#/definitions/QuestionsResponse',
          },
        },
      },
    },
  },
  '/tests/{testId}/questions/{questionId}': {
    delete: {
      tags: ['question'],
      summary:
        'Delete question by question id for specified test id. Access only for admins',
      description: '',
      operationId: 'deleteQuestion',
      parameters: [
        {
          in: 'path',
          name: 'testId',
          description: 'Id of test',
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'questionId',
          description: 'Id of question, which should be removed',
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
          description: 'Successfully removed question',
        },
      },
    },
  },
};

export const questionDefinitions = {
  CreateQuestionRequest: {
    type: 'object',
    properties: {
      question: { type: 'string' },
      choices: {
        type: 'array',
        items: { $ref: '#/definitions/ChoiceRequest' },
      },
    },
  },
  QuestionsResponse: {
    type: 'object',
    properties: {
      questions: {
        type: 'array',
        items: {
          $ref: '#/definitions/Question',
        },
      },
    },
    xml: {
      name: 'QuestionsResponse',
    },
  },
  Question: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      question: { type: 'string' },
      testId: { type: 'string' },
      choices: {
        type: 'array',
        items: {
          $ref: '#/definitions/Choice',
        },
      },
    },
  },
  Choice: {
    type: 'object',
    properties: {
      id: { type: 'number' },
      title: { type: 'string' },
      isRight: { type: 'boolean' },
    },
  },
  ChoiceRequest: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      isRight: { type: 'boolean' },
    },
  },
};
