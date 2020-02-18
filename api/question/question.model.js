import mongoose from 'mongoose';
import { QuestionDao } from './question.dao';

const questionSchema = mongoose.Schema(
  {
    testId: { type: mongoose.Types.ObjectId, required: true },
    question: { type: String, required: true },
    choices: [
      {
        id: { type: Number, required: true },
        title: { type: String, required: true },
        isRight: { type: Boolean, required: false },
      },
    ],
    rightChoice: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

questionSchema.loadClass(QuestionDao);
export const questionModel = mongoose.model('Question', questionSchema);
