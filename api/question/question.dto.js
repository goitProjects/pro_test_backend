export class QuestionDto {
  get composeQuestion() {
    return this._composeQuestion.bind(this);
  }
  get composeChoice() {
    return this._composeChoice.bind(this);
  }

  _composeQuestion(questionInstance) {
    const { _id: id, question, testId, choices } = questionInstance;
    return {
      id,
      question,
      testId,
      choices: choices.map(choice => this._composeChoice(choice)),
    };
  }

  _composeChoice(choice, forExam) {
    const choiceToSend = { id: choice.id, title: choice.title };
    if (!forExam) {
      choiceToSend.isRigth = choice.isRight;
    }

    return choiceToSend;
  }
}

export const questionDto = new QuestionDto();
