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
        filter: post => {
          return true
        },
      },
    }),
  },
})

subscriptionManager.subscribe({
  query: `
    subscription newPosts {
      postAdded {
        _id
        title
        body
      }
    }
  `,
  context: {},
  callback: (err, data) => console.log(data),
})

export { subscriptionManager, pubsub }
