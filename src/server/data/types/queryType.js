import {
  GraphQLObjectType,
  GraphQLList,
} from 'graphql'

import userType from './userType'
import postType from './postType'

const queryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root of the Blog Schema',
  fields: () => ({
    viewer: {
      type: userType,
      resolve: (root, args, context) => context.user,
    },

    testLoader: {
      type: new GraphQLList(postType),
      resolve: (root, args, context) => {
        const postIds = [
          '5824438f9d70c627a82daa27',
          '5824438f9d70c627a82daa26',
          '5824438f9d70c627a82daa28',
          '5824438f9d70c627a82daa27', // test load duplicate id
        ]

        return postIds.map(postId => context.PostLoader.load(postId))
      },
    },
  }),
})

export default queryType
