import mongoose, { Schema } from 'mongoose';
import { sessionStatuses } from './session.statuses';
import { SessionDao } from './session.dao';

const sessionSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId },
    status: { type: String, required: true, default: sessionStatuses.ACTIVE },
  },
  {
    timestamps: true,
  },
);
sessionSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

sessionSchema.loadClass(SessionDao);
export const sessionModel = mongoose.model('Session', sessionSchema);
