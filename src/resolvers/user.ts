import axios from "axios";
const DATA_URL =
  "https://s3-eu-west-1.amazonaws.com/sentiance.solutions/datasets/public/user1.json";

export default {
  Query: {
    saveData: async (parent: any, args: any, context: any) => {
      const { models } = context;
      console.log(models);
      let data = await axios.get(DATA_URL);
      const { event_history, moment_history, segments } = data.data.data.user;
      let UserModel = models.User({
        event_history: event_history[0],
        moment_history: moment_history[0],
        segments: segments[0],
      });
      // await UserModel.save();
      await UserModel.event_history.insertMany(event_history);
      await UserModel.moment_history.insertMany(moment_history);
      await UserModel.segments.insertMany(segments);

      await UserModel.save();

      //   let userData = models.User.insertMany(data.data.data.user);
      //   await userData.save();
      //   console.log(userData);
      return data.data.data.user;
    },
  },
};
