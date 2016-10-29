import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql'

import {
  fromGlobalId,
} from 'graphql-relay'

import { viewerQuery, postQuery } from './queries/rootQueries'
import { addPostMutation } from './mutations/postMutations'

import NodeInterface from './types/NodeInterfaceType'

function resolveNodeField(source, args, context, { rootValue: objectManager }) {
  // // the node field will receive a globally
  // // unique id, and here we convert that back
  // // to the local type and id
  // const { id, type } = fromGlobalId(args.id)

  // // map the local type and id into the
  // // actual data for the record
  // if (type === 'Viewer') {
  //   return objectManager.getOneObject('User', { id })
  // }
  // return objectManager.getOneObject(type, { id })
  return null
}

const queryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root of the Blog Schema',
  fields: () => ({
    // node: node.nodeField,
    // node: {
    //   type: NodeInterface,
    //   args: {
    //     id: {
    //       type: new GraphQLNonNull(GraphQLID),
    //     },
    //   },
    //   resolve: resolveNodeField,
    // },
    // viewer: viewerQuery,
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
