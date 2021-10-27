import { PubSub } from "graphql-yoga";
import uuidv4 from "uuid/v4";
import Message from "../../models/message";

const Mutation = {
  createMessage: (_, { data }, { pubsub }) => {
    //console.log(`${args.name}, ${args.body}`)
    Message.create(
      {
        from: data.from,
        to: data.to,
        body: data.body,
      },
      (err, instance) => {
        if (err) return;
        pubsub.publish(`message about ${data.from}`, {
          message: { mutation: "CREATED", data: data },
        });
        pubsub.publish(`message about ${data.to}`, {
          message: {mutation: "CREATED", data: data}
        })
      }
    );
    return data;
  },
  deleteMessage: (parent, args, { pubsub }) => {
    Message.deleteMany({}, () => {
      pubsub.publish("message", {
        message: { mutation: "DELETED", data: null },
      });
      console.log("deleted");
    });
  },
};

export { Mutation as default };
