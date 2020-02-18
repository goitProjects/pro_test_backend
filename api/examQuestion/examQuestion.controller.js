import { OK, NO_CONTENT } from 'http-status-codes';
import { examQuestionModel } from './examQuestion.model';
import { examQuestionDto } from './examQuestion.dto';
import { NotFoundError, ConflictError } from '../helpers/errorsConstructors';
import { examModel } from '../exam/exam.model';

export class ExamQuestionController {
  get answerQuestion() {
    return this._answerQuestion.bind(this);
  }
  get answerExamQuestions() {
    return this._answerExamQuestions.bind(this);
  }

  async _answerQuestion(req, res) {
    const { examId, examQuestionId, choiceId } = req.params;

    const exam = await examModel.getExamById(examId);
    if (!exam) {
      throw new NotFoundError('Exam not found');
    }
    if (exam.finished) {
      throw new ConflictError('You are not able to answer finished exams');
    }

    const question = await examQuestionModel.answerExamQuestion(
      examId,
      examQuestionId,
      choiceId,
    );
    if (!question) {
      throw new NotFoundError('Exam question not found');
    }

    return res.status(OK).json({
      question: examQuestionDto.composeQuestionWithAnswer(question),
    });
  }

  async _answerExamQuestions(req, res) {
    const { examId } = req.params;
    const { answers } = req.body;

    const exam = await examModel.getExamById(examId);
    if (!exam) {
      throw new NotFoundError('Exam not found');
    }
    if (exam.finished) {
      throw new ConflictError('You are not able to answer finished exams');
    }

    await examQuestionModel.bulkAnswerExamQuestions(examId, answers);

    return res.status(NO_CONTENT).send();
  }
}

export const examQuestionController = new ExamQuestionController();
