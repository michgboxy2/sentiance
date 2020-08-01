import axios from "axios";
const DATA_URL =
  "https://s3-eu-west-1.amazonaws.com/sentiance.solutions/datasets/public/user1.json";

export default {
  Query: {
    saveSegmentData: async (parent: any, args: any, context: any) => {
      try {
        const { models } = context;
        let data = await axios.get(DATA_URL);
        const { segments } = data.data.data.user;
        await models.Segment.insertMany(segments);

        return segments;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
