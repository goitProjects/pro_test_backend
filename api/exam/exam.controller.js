import { OK, CREATED } from 'http-status-codes';
import { testModel } from '../test/test.model';
import { NotFoundError, ConflictError } from '../helpers/errorsConstructors';
import { questionModel } from '../question/question.model';
import { examModel } from './exam.model';
import { examQuestionModel } from '../examQuestion/examQuestion.model';
import { examDto } from './exam.dto';
import { examQuestionDto } from '../examQuestion/examQuestion.dto';

export class ExamController {
  get startExam() {
    return this._startExam.bind(this);
  }
  get finishExam() {
    return this._finishExam.bind(this);
  }
  get getExamStatus() {
    return this._getExamStatus.bind(this);
  }
  get getExamResults() {
    return this._getExamResults.bind(this);
  }

  async _startExam(req, res) {
    const { testId } = req.query;

    const test = await testModel.findTestById(testId);
    if (!test) {
      throw new NotFoundError('Test not found');
    }

    const questions = await questionModel.aggregateQuestionsForExam(
      testId,
      test.examQuestionsCount,
    );

    if (questions.length < test.examQuestionsCount) {
      throw new ConflictError(
        'Test does not have sufficient amount of questions',
      );
    }

    const newExam = await examModel.createExam(test, req.user._id);
    const examQuestions = await examQuestionModel.createExamQuestions(
      newExam,
      questions,
    );

    return res.status(CREATED).json({
      exam: examDto.composeExam(newExam),
      questions: (examQuestions || []).map(questn =>
        examQuestionDto.composeQuestionForExam(questn),
      ),
    });
  }

  async _finishExam(req, res) {
    const { examId } = req.params;
    const exam = await examModel.getExamById(examId);
    if (!exam) {
      throw new NotFoundError('Exam not found');
    }
    if (exam.finished) {
      throw new ConflictError('Exam already finished');
    }

    const examWithQuestions = await examModel.finishExam(examId);

    return res.status(OK).json({
      exam: examDto.composeExam(examWithQuestions),
      questions: examWithQuestions.questions.map(questn =>
        examQuestionDto.composeQuestionWithAnswer(questn),
      ),
      ...this._countAnswersMetric(examWithQuestions.questions),
    });
  }

  async _getExamStatus(req, res) {
    const { examId } = req.params;
    const examWithQuestions = await examModel.getExamByIdWithQuestions(examId);
    if (!examWithQuestions) {
      throw new NotFoundError(`Exam results not found by id ${examId}`);
    }

    return res.status(OK).json({
      exam: examDto.composeExam(examWithQuestions),
      questions: examWithQuestions.questions.map(questn =>
        examQuestionDto.composeQuestionForExam(questn),
      ),
    });
  }

  async _getExamResults(req, res) {
    const { examId } = req.params;

    const examWithQuestions = await examModel.getExamByIdWithQuestions(examId);
    if (!examWithQuestions) {
      throw new NotFoundError(`Exam results not found by id ${examId}`);
    }
    if (!examWithQuestions.finished) {
      throw new ConflictError('Exam not published yet');
    }

    return res.status(OK).json({
      exam: examDto.composeExam(examWithQuestions),
      questions: examWithQuestions.questions.map(questn =>
        examQuestionDto.composeQuestionForExam(questn, true),
      ),
      ...this._countAnswersMetric(examWithQuestions.questions),
    });
  }

  _countAnswersMetric(questions) {
    return questions.reduce(
      (metric, questn) => {
        if (questn.rightChoice === questn.optionChoosed) {
          metric.answeredRight++;
        } else {
          metric.answeredWrong++;
        }

        return metric;
      },
      {
        answeredRight: 0,
        answeredWrong: 0,
      },
    );
  }
}

export const examController = new ExamController();
