import { questionModel } from '../question/question.model';
import mongoose from 'mongoose';
const {
  Types: { ObjectId },
} = mongoose;

export class TestDao {
  static async createTest(testFields) {
    return this.create(testFields);
  }

  static async deleteTest(testId) {
    await this.deleteOne({ _id: testId });
    await questionModel.deleteQuestionsByTestId(testId);
  }

  static async findTestById(testId) {
    if (!ObjectId.isValid(testId)) {
      return null;
    }
    return this.findById(testId);
  }

  static async findTests(options = {}) {
    return this.find(options);
  }

  static async findTestWithQuestions(testId) {
    if (!ObjectId.isValid(testId)) {
      return null;
    }
    return this.findById(testId).populate('questions');
  }

  static async publishTest(testId) {
    if (!ObjectId.isValid(testId)) {
      return null;
    }
    return this.findOneAndUpdate(
      { _id: testId },
      { published: true },
      { new: true },
    );
  }
}
