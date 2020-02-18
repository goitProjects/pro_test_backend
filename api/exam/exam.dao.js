import mongoose from 'mongoose';
const {
  Types: { ObjectId },
} = mongoose;

export class ExamDao {
  static async createExam(test, studentId) {
    return this.create({
      testId: test._id,
      name: test.name,
      authorId: test.authorId,
      studentId,
      examQuestionsCount: test.examQuestionsCount,
      description: test.description,
      questionsLeft: test.examQuestionsCount,
      finished: false,
    });
  }

  static async getExamByIdWithQuestions(examId) {
    if (!ObjectId.isValid(examId)) {
      return null;
    }
    return this.findById(examId).populate('questions');
  }

  static async finishExam(examId) {
    if (!ObjectId.isValid(examId)) {
      return null;
    }
    return this.findOneAndUpdate(
      { _id: examId },
      { finished: true },
      { new: true },
    ).populate('questions');
  }

  static async getExamById(examId) {
    if (!ObjectId.isValid(examId)) {
      return null;
    }
    return this.findById(examId);
  }

  static async adjustQuestionsLeft(examId, increment) {
    return this.updateOne(
      {
        _id: examId,
      },
      {
        $inc: { questionsLeft: increment },
      },
    );
  }
}
