export const examEndpoints = {
  '/exams/start': {
    post: {
      tags: ['exam'],
      summary: 'Start passing exam',
      description: '',
      operationId: 'startExam',
      produces: ['application/json'],
      parameters: [
        {
          in: 'query',
          name: 'testId',
          description: 'Test id which should be used for exam generation',
          required: true,
          type: 'string',
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
          description: 'Invalid query params',
        },
        '401': {
          description: 'authorization failed',
        },
        '404': {
          description: 'Test does not exist',
        },
        '409': {
          description: 'Test does not have sufficient amount of questions',
        },
        '201': {
          description: 'Successfully created exam',
          schema: {
            $ref: '#/definitions/ExamWithQuestionsResponse',
          },
        },
      },
    },
  },
  '/exams/{examId}/finish': {
    put: {
      tags: ['exam'],
      summary: 'Finish passing exam',
      description: '',
      operationId: 'finishExam',
      produces: ['application/json'],
      parameters: [
        {
          in: 'path',
          name: 'examId',
          description: 'Id of the exam, which should be finished',
          required: true,
          schema: { type: 'string' },
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
        '404': {
          description: 'Exam with provided id does not exist',
        },
        '409': {
          description: 'Exam already finished',
        },
        '200': {
          description: 'Successfully finished exam passing',
          schema: {
            $ref: '#/definitions/ExamResultResponse',
          },
        },
      },
    },
  },
  '/exams/{examId}': {
    get: {
      tags: ['exam'],
      summary: 'Get exam status',
      description: '',
      operationId: 'getExamStatus',
      produces: ['application/json'],
      parameters: [
        {
          in: 'path',
          name: 'examId',
          description: 'Id of the exam, which should be retreived',
          required: true,
          schema: { type: 'string' },
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
        '404': {
          description: 'Exam does not exist',
        },
        '200': {
          description: 'Successfully retreived exam',
          schema: {
            $ref: '#/definitions/ExamWithQuestionsResponse',
          },
        },
      },
    },
  },
  '/exams/{examId}/result': {
    get: {
      tags: ['exam'],
      summary: 'Get exam result',
      description: '',
      operationId: 'getExamResult',
      produces: ['application/json'],
      parameters: [
        {
          in: 'path',
          name: 'examId',
          description: 'Id of the exam, which should be retreived',
          required: true,
          schema: { type: 'string' },
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
        '404': {
          description: 'Exam does not exist',
        },
        '409': {
          description: 'Exam not published',
        },
        '200': {
          description: 'Successfully retreived exam results',
          schema: {
            $ref: '#/definitions/ExamResultResponse',
          },
        },
      },
    },
  },
};

export const examDefinitions = {
  ExamWithQuestionsResponse: {
    type: 'object',
    properties: {
      exam: {
        $ref: '#/definitions/Exam',
      },
      questions: {
        type: 'array',
        items: {
          $ref: '#/definitions/QuestionForExam',
        },
      },
    },
    xml: {
      name: 'ExamWithQuestionsResponse',
    },
  },
  ExamResultResponse: {
    type: 'object',
    properties: {
      exam: {
        $ref: '#/definitions/Exam',
      },
      questions: {
        type: 'array',
        items: {
          $ref: '#/definitions/QuestionForExam',
        },
      },
      answeredRight: {
        type: 'integer',
        format: 'int32',
      },
      answeredWrong: {
        type: 'integer',
        format: 'int32',
      },
    },
  },
  Exam: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      description: { type: 'string' },
      questionsLeft: {
        type: 'integer',
        format: 'int32',
      },
      finished: {
        type: 'boolean',
      },
    },
  },
};
