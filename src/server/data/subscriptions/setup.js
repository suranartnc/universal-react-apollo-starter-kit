import { PubSub, SubscriptionManager } from 'graphql-subscriptions'
import schema from '../schema'

const pubsub = new PubSub()
const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub,
  setupFunctions: {
    postAdded: (options, args) => ({    // subscription query name
      postAdded: post => {              // channel name (same as subscription query name)
        // return post.cat_id === args.cat_id
        return true                     // wheter the receiving data is related to the channel that client subscribed ?
      },
    }),
  },
})

export { subscriptionManager, pubsub }
