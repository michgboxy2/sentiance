import mongoose from "mongoose";
import { Float } from "type-graphql";

type Location = {
  significance: string;
};

type Waypoint = {
  type: String;
  latitude: number;
  longitude: number;
  timestamp: Date;
  accuracy: number;
};

type Trajectory = {
  type: String;
  encoded: String;
};

interface EventHistoryAttrs {
  type: string;
  start: Date;
  end: Date;
  analysis_type: string;
  latitude: number;
  longitude: number;
  location: Location;
  waypoint: Waypoint;
  trajectory: Trajectory;
}

export interface EventHistoryDoc extends mongoose.Document {
  type: string;
  start: Date;
  end: Date;
  analysis_type: string;
  latitude: number;
  longitude: number;
  location: Location;
  waypoint: Waypoint;
  trajectory: Trajectory;
}

interface EventHistoryModel extends mongoose.Model<EventHistoryDoc> {
  build(attr: EventHistoryAttrs): EventHistoryDoc;
}

export const eventHistorySchema = new mongoose.Schema({
  type: {
    type: String,
    trim: true,
  },

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

  latitude: {
    type: Number,
    trim: true,
  },

  longitude: {
    type: Number,
    trim: true,
  },

  location: {
    significance: {
      type: String,
      trim: true,
    },
  },
  waypoint: {
    type: {
      type: String,
      trim: true,
    },

    latitude: {
      type: Number,
    },

    longitude: {
      type: Number,
    },

    timestamp: {
      type: Date,
    },

    accuracy: {
      type: Number,
    },
  },

  trajectory: {
    type: {
      type: String,
      trim: true,
    },

    encoded: {
      type: String,
      trim: true,
    },
  },
});

eventHistorySchema.statics.build = (attrs: EventHistoryDoc) => {
  return new EventHistory(attrs);
};

const EventHistory = mongoose.model<EventHistoryDoc, EventHistoryModel>(
  "EventHistory",
  eventHistorySchema
);

export { EventHistory };
