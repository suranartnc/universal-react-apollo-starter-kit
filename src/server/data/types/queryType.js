import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql'

// import {
//   fromGlobalId,
// } from 'graphql-relay'

import { postQuery } from '../queries/rootQueries'

import NodeInterface from './NodeInterfaceType'
import userType from './userType'

function resolveNodeField(source, args) {
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
    node: {
      type: NodeInterface,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: resolveNodeField,
    },
    viewer: {
      type: userType,
      resolve: () => {
        return {
          _id: '5805c26198f0370001ac64a3', // example user
        }
      },
    },
    post: postQuery,
  }),
})

export default queryType
