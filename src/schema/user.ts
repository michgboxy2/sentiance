import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getUserEvents: User
    getUserEvent(id: ID!): User
    saveData: User
  }

  type User {
    moment_history: [MomentHistory]!
    event_history: [Event]!
    segments: [Segment]!
  }
`;
