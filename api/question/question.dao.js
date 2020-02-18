import mongoose from 'mongoose';
const {
  Types: { ObjectId },
} = mongoose;

export class QuestionDao {
  static async findWholeTestQuestions(testId) {
    if (!ObjectId.isValid(testId)) {
      return null;
    }
    return this.find({ testId });
  }

  static async aggregateQuestionsForExam(testId, examQuestionsCount) {
    return this.aggregate()
      .match({ testId: ObjectId(testId) })
      .sample(examQuestionsCount);
  }

  static async createQuestion(questionFields) {
    return this.create(questionFields);
  }

  static async deleteQuestion(questionId) {
    return this.deleteOne({ questionId });
  }

  static async deleteQuestionsByTestId(testId) {
    return this.deleteMany({ testId });
  }
}
