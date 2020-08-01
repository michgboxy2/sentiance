import { gql } from "apollo-server-express";

import eventSchema from "./event";
import segmentSchema from "./segment";
import userSchema from "./user";
import momentHistorySchema from "./momentHistory";

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [
  linkSchema,
  eventSchema,
  segmentSchema,
  userSchema,
  momentHistorySchema,
];
