import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql'

import PostModel from '../models/PostModel'
import UserModel from '../models/UserModel'

import postType from './postType'
import authorType from './authorType'

const listArgs = {
  limit: {
    type: new GraphQLNonNull(GraphQLInt),
    description: 'Number of recent items',
  },
}

const singleArgs = {
  _id: {
    type: new GraphQLNonNull(GraphQLString),
  },
}

const userType = new GraphQLObjectType({
  name: 'Viewer',
  fields: {

    myPosts: {
      type: new GraphQLList(postType),
      description: 'List of posts written by viewer',
      args: listArgs,
      resolve: (user, { limit }) => {
        if (limit >= 0) {
          return PostModel.find({
            userId: user._id,
          }).limit(limit).sort('-date')
        }
        return PostModel.find({
          userId: user._id,
        })

      },
    },

    posts: {
      type: new GraphQLList(postType),
      description: 'Recent posts in the blog',
      args: {
        categoryId: {
          type: GraphQLString,
        },
        ...listArgs,
      },
      resolve: (user, { categoryId, limit, ...args }) => {
        if (categoryId) {
          return PostModel.find({
            categories: {
              $in: [categoryId],
            },
          }).limit(limit).sort('-date')
        }
        return PostModel.find().limit(limit).sort('-date')
      },
    },

    post: {
      type: postType,
      description: 'Post by _id',
      args: singleArgs,
      resolve: (user, { _id }) => PostModel.findById(_id),
    },

    authors: {
      type: new GraphQLList(authorType),
      description: 'Available authors in the blog',
      resolve: () => UserModel.find(),
    },

    author: {
      type: authorType,
      description: 'Author by _id',
      args: singleArgs,
      resolve: (user, { _id }) => UserModel.findById(_id),
    },

  },
})

export default userType
