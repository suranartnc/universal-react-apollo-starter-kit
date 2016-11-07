import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from 'graphql'

import PostModel from '../models/PostModel'
import UserModel from '../models/UserModel'

import postType from './postType'
import authorType from './authorType'

import {
  listArgs,
  singleArgs,
} from '../utils/schemaUtils'

import {
  outputError,
} from '../utils/helpers'

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
          })
          .limit(limit).sort('-date')
          .catch(error => outputError(error))
        }
        return PostModel.find({
          userId: user._id,
        })
        .catch(error => outputError(error))
      },
    },

    posts: {
      type: new GraphQLList(postType),
      description: 'Recent posts in the blog',
      args: {
        categoryId: {
          type: GraphQLString,
        },
        offset: {
          type: GraphQLInt,
        },
        limit: {
          type: GraphQLInt,
        },
        ...listArgs,
      },
      resolve: (user, { categoryId, offset = 0, limit = 10, ...args }) => {
        if (categoryId) {
          return PostModel.find({
            categories: {
              $in: [categoryId],
            },
          })
          .skip(offset)
          .limit(limit).sort('-date')
          .catch(error => outputError(error))
        }
        return PostModel.find()
          .skip(offset)
          .limit(limit).sort('-date')
          .catch(error => outputError(error))
      },
    },

    post: {
      type: postType,
      description: 'Post by _id',
      args: singleArgs,
      resolve: (user, { _id }) => PostModel.findById(_id).catch(error => outputError(error)),
    },

    authors: {
      type: new GraphQLList(authorType),
      description: 'Available authors in the blog',
      resolve: () => UserModel.find().catch(error => outputError(error)),
    },

    author: {
      type: authorType,
      description: 'Author by _id',
      args: singleArgs,
      resolve: (user, { _id }) => UserModel.findById(_id).catch(error => outputError(error)),
    },

  },
})

export default userType
