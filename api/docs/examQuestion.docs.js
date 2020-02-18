export const examQuestionEndpoints = {
  '/exams/{examId}/questions/{examQuestionId}/answer/{choiceId}': {
    put: {
      tags: ['examQuestion'],
      summary: 'Answer exam question',
      description: '',
      operationId: 'answerQuestion',
      parameters: [
        {
          in: 'path',
          name: 'examId',
          description: 'Id of exam',
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'choiceId',
          description: 'Id of option selected',
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'path',
          name: 'examQuestionId',
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
        '404': {
          description: 'exam or exam question not found',
        },
        '409': {
          description: 'exam already finished',
        },
        '200': {
          description: 'Successfully answered question',
          schema: {
            $ref: '#/definitions/QuestionWithAnswer',
          },
        },
      },
    },
  },
  '/exams/{examId}/questions': {
    put: {
      tags: ['examQuestion'],
      summary: 'Answer bulk of exam questions',
      description: '',
      operationId: 'answerExamQuestion',
      parameters: [
        {
          in: 'path',
          name: 'examId',
          description: 'Id of exam',
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
          name: 'ExamAnswers',
          description: 'Users answers to exam questions',
          required: true,
          schema: {
            $ref: '#/definitions/ExamAnswersRequest',
          },
        },
      ],
      responses: {
        '401': {
          description: 'authorization failed',
        },
        '404': {
          description: 'exam not found',
        },
        '409': {
          description: 'exam already finished',
        },
        '204': {
          description: 'Successfully answered bulk of questions',
        },
      },
    },
  },
};

export const examQuestionDefinitions = {
  QuestionForExam: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      examId: { type: 'string' },
      question: { type: 'string' },
      choices: {
        type: 'array',
        items: {
          $ref: '#/definitions/ChoiceForExam',
        },
      },
      optionChoosed: { type: 'integer', format: 'int32' },
    },
  },
  QuestionWithAnswer: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      examId: { type: 'string' },
      question: { type: 'string' },
      choices: {
        type: 'array',
        items: {
          $ref: '#/definitions/ChoicesWithRightAnswer',
        },
      },
      optionChoosed: { type: 'integer', format: 'int32' },
      rightChoice: {
        type: 'integer',
        format: 'int32',
      },
    },
  },
  ChoiceForExam: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      title: { type: 'string' },
    },
  },
  ChoicesWithRightAnswer: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      title: { type: 'string' },
      isRight: { type: 'boolean' },
    },
  },
  ExamAnswersRequest: {
    type: 'object',
    properties: {
      answers: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            examQuestionId: { type: 'string' },
            choiceId: { type: 'integer', format: 'int32' },
          },
        },
      },
    },
  },
};
