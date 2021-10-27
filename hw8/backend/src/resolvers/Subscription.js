import Message from "../../models/message";

const Subscription = {
  message: {
    subscribe(parent, {username}, { pubsub }, info) {
      return pubsub.asyncIterator(`message about ${username}`);
    },
  }, //MessageSubscriptionPayload!
};

export { Subscription as default };
