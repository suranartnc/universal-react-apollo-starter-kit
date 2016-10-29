import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql'

import {
  connectionDefinitions,
} from 'graphql-relay'

import { nodeField } from './utils/nodeDefinitions'
import { viewerQuery, postQuery } from './queries/rootQueries'
import { addPostMutation } from './mutations/postMutations'

const {
  connectionType: commentConnection,
} = connectionDefinitions({
  name: 'Comment',
  nodeType: commentType,
})

const {
  connectionType: postConnection,
  edgeType: postEdge,
} = connectionDefinitions({
  name: 'Post',
  nodeType: postType,
})

const queryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root of the Blog Schema',
  fields: () => ({
    node: nodeField,
    viewer: viewerQuery,
    post: postQuery,
  }),
})

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
