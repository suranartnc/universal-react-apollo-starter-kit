import {
  GraphQLObjectType,
} from 'graphql'

import userType from './userType'

const queryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root of the Blog Schema',
  fields: () => ({
    viewer: {
      type: userType,
      resolve: (root, args, context) => context.user,
    },
  }),
})

export default queryType
