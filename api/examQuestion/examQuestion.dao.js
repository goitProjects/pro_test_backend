import { examModel } from '../exam/exam.model';
import mongoose from 'mongoose';
const {
  Types: { ObjectId },
} = mongoose;

export class ExamQuestionDao {
  static async createExamQuestions(exam, questions) {
    const examQuestionsFields = questions.map(questn => ({
      examId: exam._id,
      question: questn.question,
      choices: questn.choices,
      rightChoice: questn.rightChoice,
    }));

    return this.create(examQuestionsFields);
  }

  static async answerExamQuestion(examId, questionId, choiceId) {
    if (!ObjectId.isValid(examId) || !ObjectId.isValid(questionId)) {
      return null;
    }
    const questionAnswered = await this.findOneAndUpdate(
      {
        examId: examId,
        _id: questionId,
        optionChoosed: { $eq: null },
      },
      {
        optionChoosed: choiceId,
      },
      {
        new: true,
      },
    );

    await examModel.adjustQuestionsLeft(examId, -1);

    return questionAnswered;
  }

  static async bulkAnswerExamQuestions(examId, answers) {
    const bulkAnswerOperation = this.collection.initializeUnorderedBulkOp();
    answers.forEach(({ examQuestionId, choiceId }) => {
      if (!ObjectId.isValid(examQuestionId)) {
        return;
      }
      bulkAnswerOperation
        .find({ _id: ObjectId(examQuestionId), examId: ObjectId(examId) })
        .update({ $set: { optionChoosed: choiceId } });
    });

    await bulkAnswerOperation.execute();
  }

  static async getExamQuestionsByExamId(examId) {
    if (!ObjectId.isValid(examId)) {
      return null;
    }
    return this.find({ examId });
  }
}
