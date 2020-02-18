import { NO_CONTENT, CREATED, OK } from 'http-status-codes';
import { testModel } from './test.model';
import { testDto } from './test.dto';
import { questionDto } from '../question/question.dto';
import { NotFoundError } from '../helpers/errorsConstructors';

export class TestController {
  get createTest() {
    return this._createTest.bind(this);
  }
  get deleteTest() {
    return this._deleteTest.bind(this);
  }
  get getTestList() {
    return this._getTestList.bind(this);
  }
  get getPublishedTestList() {
    return this._getPublishedTestList.bind(this);
  }
  get getTest() {
    return this._getTest.bind(this);
  }
  get publishTest() {
    return this._publishTest.bind(this);
  }

  async _createTest(req, res) {
    const { user, body } = req;

    const newTestFields = {
      authorId: user._id,
      ...body,
    };
    const newTest = await testModel.createTest(newTestFields);

    return res.status(CREATED).json({
      test: testDto.composeTest(newTest),
    });
  }

  async _deleteTest(req, res) {
    const { testId } = req.params;
    await testModel.deleteTest(testId);

    return res.status(NO_CONTENT).send();
  }

  async _getTestList(req, res) {
    const tests = await testModel.findTests();

    return res.status(OK).json({
      tests: tests.map(test => {
        return testDto.composeTest(test);
      }),
    });
  }

  async _getPublishedTestList(req, res) {
    const tests = await testModel.findTests({ published: true });

    return res.status(OK).json({
      tests: tests.map(test => {
        return testDto.composeTest(test);
      }),
    });
  }

  async _getTest(req, res) {
    const { testId } = req.params;

    const testWithQuestions = await testModel.findTestWithQuestions(testId);

    if (!testWithQuestions) {
      throw new NotFoundError('Test not found');
    }

    return res.status(OK).json({
      test: testDto.composeTest(testWithQuestions),
      questions: testWithQuestions.questions.map(questn =>
        questionDto.composeQuestion(questn),
      ),
    });
  }

  async _publishTest(req, res) {
    const { testId } = req.params;
    const test = await testModel.publishTest(testId);
    if (!test) {
      throw new NotFoundError('Test not found');
    }

    return res.status(NO_CONTENT).send();
  }
}

export const testController = new TestController();
