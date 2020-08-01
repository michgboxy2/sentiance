import mongoose from "mongoose";

interface MomentHistoryAttrs {
  start: Date;
  end: Date;
  analysis_type: string;
  moment_definition_id: string;
}

export interface MomentHistoryDoc extends mongoose.Document {
  start: Date;
  end: Date;
  analysis_type: string;
  moment_definition_id: string;
}

interface MomentHistoryModel extends mongoose.Model<MomentHistoryDoc> {
  build(attr: MomentHistoryAttrs): MomentHistoryDoc;
}

export const momentHistorySchema = new mongoose.Schema({
  start: {
    type: mongoose.Schema.Types.Date,
  },

  end: {
    type: mongoose.Schema.Types.Date,
  },

  analysis_type: {
    type: String,
    trim: true,
  },

  moment_definition_id: {
    type: String,
  },
});

momentHistorySchema.statics.build = (attrs: MomentHistoryDoc) => {
  return new MomentHistory(attrs);
};

const MomentHistory = mongoose.model<MomentHistoryDoc, MomentHistoryModel>(
  "MomentHistory",
  momentHistorySchema
);

export { MomentHistory };
