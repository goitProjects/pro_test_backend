import { questionDto } from '../question/question.dto';

export class ExamQuestionDto {
  get composeQuestionForExam() {
    return this._composeQuestionForExam.bind(this);
  }
  get composeQuestionWithAnswer() {
    return this._composeQuestionWithAnswer.bind(this);
  }

  _composeQuestionForExam(examQuestion, displayRight = false) {
    const {
      _id: id,
      examId,
      question,
      choices,
      optionChoosed,
      rightChoice,
    } = examQuestion;

    const questionForExam = {
      id,
      examId,
      question,
      choices: choices.map(choice => questionDto.composeChoice(choice, true)),
      optionChoosed,
    };
    if (optionChoosed || displayRight) {
      questionForExam.rightChoice = rightChoice;
    }

    return questionForExam;
  }

  _composeQuestionWithAnswer(examQuestion) {
    const {
      _id: id,
      examId,
      question,
      choices,
      optionChoosed,
      rightChoice,
    } = examQuestion;

    const questionWithAnswer = {
      id,
      examId,
      question,
      choices: choices.map(choice => questionDto.composeChoice(choice, true)),
      optionChoosed,
      rightChoice,
    };
    if (optionChoosed) {
      questionWithAnswer.rightChoice = rightChoice;
    }

    return questionWithAnswer;
  }
}

export const examQuestionDto = new ExamQuestionDto();
