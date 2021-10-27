const Subscription = {
  message: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.asyncIterator("message");
    },
  }, //MessageSubscriptionPayload!
};

export { Subscription as default };
