import { OK, CREATED, NO_CONTENT } from 'http-status-codes';
import { questionModel } from '../question/question.model';
import { questionDto } from '../question/question.dto';
import { ConflictError, NotFoundError } from '../helpers/errorsConstructors';
import { testModel } from '../test/test.model';

export class QuestionController {
  get getTestQuestions() {
    return this._getTestQuestions.bind(this);
  }
  get createQuestion() {
    return this._createQuestion.bind(this);
  }
  get deleteQuestion() {
    return this._deleteQuestion.bind(this);
  }

  async _getTestQuestions(req, res) {
    const { testId } = req.params;

    const test = await testModel.findTestById(testId);
    if (!test) {
      throw new NotFoundError(`Test with id ${testId} does not exist`);
    }

    const questions = await questionModel.findWholeTestQuestions(testId);
    return res.status(OK).json({
      questions: questions.map(questn => questionDto.composeQuestion(questn)),
    });
  }

  async _createQuestion(req, res) {
    const { testId } = req.params;
    const questionFields = req.body;

    const test = await testModel.findTestById(testId);
    if (!test) {
      throw new NotFoundError('Test not found');
    }

    questionFields.choices = questionFields.choices.map((choice, ind) => ({
      id: ind + 1,
      ...choice,
    }));
    const rightAnswers = questionFields.choices.filter(
      choice => choice.isRight,
    );
    if (!rightAnswers.length) {
      throw new ConflictError('You have not provided right answer');
    }
    if (rightAnswers.length !== 1) {
      throw new ConflictError('Now only 1 right answer supported');
    }

    questionFields.rightChoice = rightAnswers[0].id;
    questionFields.testId = testId;
    const newQuestion = await questionModel.createQuestion(questionFields);

    return res.status(CREATED).json({
      question: questionDto.composeQuestion(newQuestion),
    });
  }

  async _deleteQuestion(req, res) {
    const { questionId } = req.params;
    await questionModel.deleteQuestion(questionId);

    return res.status(NO_CONTENT).send();
  }
}

export const questionController = new QuestionController();
