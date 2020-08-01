import { gql } from "apollo-server-express";

export default gql`
  scalar Date

  extend type Query {
    insertEvents: [Event]
    pagedListOfEvents(cursor: String, limit: Int): EventConnection!
    getEventByIdentifier(id: ID): Event
    getEventByDate(date: String): [Event]
  }

  type EventConnection {
    edges: [Event!]!
    pageInfo: PageInfo!
  }
  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  type Event {
    id: ID
    type: String
    start: Date
    end: Date
    analysis_type: String
    mode: String
    distance: Int
    latitude: Float
    longitude: Float
    location: Location
    waypoint: [Waypoint]
    trajectory: Trajectory
  }

  type One {
    name: String
  }

  type Location {
    significance: String!
  }

  type Waypoint {
    type: String
    latitude: Float
    longitude: Float
    timestamp: Date
    accuracy: Int
  }

  type Trajectory {
    type: String
    encoded: String
  }
`;
