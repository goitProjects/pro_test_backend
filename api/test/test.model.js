import mongoose from 'mongoose';
import { TestDao } from './test.dao';

const testSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    authorId: { type: mongoose.Types.ObjectId, required: true },
    examQuestionsCount: { type: Number, required: true },
    description: { type: String, required: false },
    published: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  },
);
testSchema.virtual('questions', {
  ref: 'Question',
  localField: '_id',
  foreignField: 'testId',
  justOne: false,
});

testSchema.loadClass(TestDao);
export const testModel = mongoose.model('Test', testSchema);
