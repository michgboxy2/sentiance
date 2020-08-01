import mongoose from "mongoose";

// "segment_definition_id": "geography.work.antwerpen",
// "segment_definition": {
// "id": "geography.work.antwerpen",
// "display_name": "Work : Antwerp",
// "description": "Works in Antwerp"
// }

type SegmentType = {
  id: string;
  display_name: string;
  description: string;
};

interface SegmentAttrs {
  segment_definition_id: string;
  segment_definition: SegmentType;
}

export interface SegmentDoc extends mongoose.Document {
  segment_definition_id: string;
  segment_definition: SegmentType;
}

interface SegmentModel extends mongoose.Model<SegmentDoc> {
  build(attrs: SegmentAttrs): SegmentDoc;
}

export const segmentSchema = new mongoose.Schema({
  segment_definition_id: {
    type: String,
    required: true,
    trim: true,
  },

  segment_definition: {
    id: {
      type: String,
      required: true,
      trim: true,
    },

    display_name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
});

segmentSchema.statics.build = (attrs: SegmentDoc) => {
  return new Segment(attrs);
};

const Segment = mongoose.model<SegmentDoc, SegmentModel>(
  "Segment",
  segmentSchema
);

export { Segment };
