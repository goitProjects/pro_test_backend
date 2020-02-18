import mongoose from 'mongoose';
import { ExamQuestionDao } from './examQuestion.dao';

const examQuestionSchema = mongoose.Schema(
  {
    examId: { type: mongoose.Types.ObjectId, required: true },
    question: { type: String, required: true },
    choices: [
      {
        id: { type: Number, required: true },
        title: { type: String, required: true },
        isRight: { type: Boolean, required: false },
      },
    ],
    optionChoosed: { type: Number, required: false, default: null },
    rightChoice: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

examQuestionSchema.loadClass(ExamQuestionDao);
export const examQuestionModel = mongoose.model(
  'ExamQuestion',
  examQuestionSchema,
);
