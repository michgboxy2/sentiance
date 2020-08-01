import axios from "axios";
import endOfDay from "date-fns/endOfDay";
import startOfDay from "date-fns/startOfDay";
const DATA_URL =
  "https://s3-eu-west-1.amazonaws.com/sentiance.solutions/datasets/public/user1.json";

export default {
  Query: {
    insertEvents: async (parent: any, args: any, context: any) => {
      try {
        const { models } = context;
        let data = await axios.get(DATA_URL);
        const { event_history } = data.data.data.user;
        await models.EventHistory.insertMany(event_history);

        return event_history;
      } catch (e) {
        throw new Error(e);
      }
    },

    getEventByIdentifier: async (parent: any, args: any, context: any) => {
      try {
        const { models } = context;
        const { id } = args;
        let data = await models.EventHistory.findById(id);
        return data;
      } catch (e) {
        throw new Error(e);
      }
    },

    getEventByDate: async (parent: any, args: any, context: any) => {
      try {
        const { date } = args;
        const { models } = context;
        let data = await models.EventHistory.find({
          start: {
            $gte: startOfDay(new Date(date)),
            $lte: endOfDay(new Date(date)),
          },
        });

        return data;
      } catch (e) {
        throw new Error(e);
      }
    },

    pagedListOfEvents: async (parent: any, args: any, context: any) => {
      try {
        const toCursorHash = (string: string) =>
          Buffer.from(string).toString("base64");
        const fromCursorHash = (string: string) =>
          Buffer.from(string, "base64").toString("ascii");

        const { models } = context;
        const { limit = 100, cursor } = args;

        let cursorOption = cursor
          ? await models.EventHistory.find({
              start: {
                $lt: fromCursorHash(cursor),
              },
            })
              .limit(limit + 1)
              .sort({ start: "DESC" })
          : await models.EventHistory.find({})
              .limit(limit + 1)
              .sort({ start: "DESC" });

        let data = cursorOption;
        const hasNextPage = data.length > limit;
        const edges = hasNextPage ? data.slice(0, -1) : data;

        return {
          edges,
          pageInfo: {
            hasNextPage,
            endCursor: toCursorHash(edges[edges.length - 1].start.toString()),
          },
        };
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
