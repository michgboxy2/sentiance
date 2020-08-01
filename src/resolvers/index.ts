import { GraphQLDateTime } from "graphql-iso-date";
import userResolver from "./user";
import eventResolver from "./event";
import momentResolver from "./momentHistory";
import segmentResolver from "./segment";

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  customScalarResolver,
  userResolver,
  eventResolver,
  momentResolver,
  segmentResolver,
];
