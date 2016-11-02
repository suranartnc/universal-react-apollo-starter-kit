import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql'

import { postQuery } from '../queries/rootQueries'

import userType from './userType'

const queryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root of the Blog Schema',
  fields: () => ({
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
