import { gql } from "apollo-server-express";
import { Field, ID, ObjectType } from "type-graphql";

export default gql`
  extend type Query {
    saveSegmentData: [Segment]
  }

  type Segment {
    segment_definition_id: String!
    segment_definition: SegmentDefinition!
  }

  type SegmentDefinition {
    id: String!
    display_name: String!
    description: String!
  }
`;
