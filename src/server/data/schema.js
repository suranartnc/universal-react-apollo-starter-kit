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

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPost: addPostMutation,
    likePost: likePostMutation,
    deletePost: deletePostMutation,
  },
})

const Schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
})

export default Schema
