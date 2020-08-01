import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getEventMoments(id: ID!): UserMoment
  }

  type Users {
    moment_history: [MomentHistory]!
    event_history: [Event]!
    segments: [Segment]!
  }

  type UserMoment {
    moment_history: [MomentHistory]!
    event: Event
  }
`;
