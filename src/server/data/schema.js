import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql'

import queryType from './types/queryType'
import { addPostMutation } from './mutations/postMutations'

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPost: addPostMutation,
  },
})

const Schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
})

export default Schema
