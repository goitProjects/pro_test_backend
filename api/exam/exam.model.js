import mongoose from 'mongoose';
import { ExamDao } from './exam.dao';

const examSchema = mongoose.Schema(
  {
    testId: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
    authorId: { type: mongoose.Types.ObjectId, required: true },
    studentId: { type: mongoose.Types.ObjectId, required: true },
    examQuestionsCount: { type: Number, required: true },
    description: { type: String, required: false },
    answeredRightCount: { type: Number, required: false },
    answeredWrongCount: { type: Number, required: false },
    questionsLeft: { type: Number, required: true },
    finished: { type: Boolean, required: false },
  },
  {
    timestamps: true,
  },
);
examSchema.virtual('questions', {
  ref: 'ExamQuestion',
  localField: '_id',
  foreignField: 'examId',
  justOne: false,
});

examSchema.loadClass(ExamDao);
export const examModel = mongoose.model('Exam', examSchema);
