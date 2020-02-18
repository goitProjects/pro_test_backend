export class ExamDto {
  get composeExam() {
    return this._composeExam.bind(this);
  }

  _composeExam(exam) {
    const { _id, name, description, questionsLeft, finished } = exam;
    return {
      id: _id,
      name,
      description,
      questionsLeft,
      finished,
    };
  }
}

export const examDto = new ExamDto();
