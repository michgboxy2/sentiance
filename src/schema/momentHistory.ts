import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getMomentHistory(id: ID): MomentHistory!
    saveMomentHistory: [MomentHistory]
  }

  type MomentHistory {
    id: ID!
    start: Date
    end: Date
    analysis_type: String
    moment_definition_id: String
  }
`;
