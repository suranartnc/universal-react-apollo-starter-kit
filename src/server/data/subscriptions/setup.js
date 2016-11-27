import { PubSub, SubscriptionManager } from 'graphql-subscriptions'
import schema from '../schema'

const pubsub = new PubSub()
const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub,
  setupFunctions: {
    // commentAdded: (options, args) => ({
    //   commentAdded: comment => comment.repository_name === args.repoFullName,
    // }),
    postAdded: (options, args) => ({    // subscription name
      postAdded: {                      // channel name
        filter: post => {               // wheter the receiving data is related to the channel that client subscribed ?
          return true
        },
      },
    }),
  },
})

export { subscriptionManager, pubsub }
