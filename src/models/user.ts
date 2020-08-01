import mongoose from "mongoose";
import { Segment, SegmentDoc, segmentSchema } from "./segment";
import {
  EventHistory,
  EventHistoryDoc,
  eventHistorySchema,
} from "./eventHistory";
import {
  MomentHistory,
  MomentHistoryDoc,
  momentHistorySchema,
} from "./momentHistory";

interface UserAttrs {
  moment_history: [MomentHistoryDoc];
  event_history: [EventHistoryDoc];
  segments: [SegmentDoc];
}

interface UserDoc extends mongoose.Document {
  moment_history: [MomentHistoryDoc];
  event_history: [EventHistoryDoc];
  segments: [SegmentDoc];
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attr: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema({
  moment_history: [momentHistorySchema],
  event_history: [eventHistorySchema],
  segments: [segmentSchema],
});

userSchema.statics.build = (attrs: UserDoc) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
