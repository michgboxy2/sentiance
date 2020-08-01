import axios from "axios";
import endOfDay from "date-fns/endOfDay";
import startOfDay from "date-fns/startOfDay";

export default {
  Query: {
    getEventMoments: async (parent: any, args: any, context: any) => {
      const { id } = args;
      const { models } = context;
      try {
        const { date } = args;
        const { models } = context;
        let data = await models.EventHistory.findById(id);
        let moments = await models.MomentHistory.find({
          start: {
            $gte: data.start,
          },
          end: {
            $lte: data.end,
          },
        });

        return {
          event: data,
          moment_history: moments,
        };
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
