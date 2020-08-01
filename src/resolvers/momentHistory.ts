import axios from "axios";
const DATA_URL =
  "https://s3-eu-west-1.amazonaws.com/sentiance.solutions/datasets/public/user1.json";

export default {
  Query: {
    saveMomentHistory: async (parent: any, args: any, context: any) => {
      try {
        const { models } = context;
        let data = await axios.get(DATA_URL);
        const { moment_history } = data.data.data.user;
        await models.MomentHistory.insertMany(moment_history);

        return moment_history;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
