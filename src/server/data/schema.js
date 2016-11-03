import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql'

import queryType from './types/queryType'

import {
  addPostMutation,
  likePostMutation,
} from './mutations/postMutations'

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPost: addPostMutation,
    likePost: likePostMutation,
  },
})

const Schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
})

export default Schema
