import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql'

import queryType from './types/queryType'

import {
  addPostMutation,
  likePostMutation,
  deletePostMutation,
} from './mutations/postMutations'

import { postAddedSubscription } from './subscriptions/postSubscriptions'

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPost: addPostMutation,
    likePost: likePostMutation,
    deletePost: deletePostMutation,
  },
})

const subscriptionType = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    postAdded: postAddedSubscription,
  },
})

const Schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
  subscription: subscriptionType,
})

export default Schema
