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

const userType = new GraphQLObjectType({
  name: 'Viewer',
  fields: {

    // myPosts: {
    //   type: postConnection.connectionType,
    //   description: 'List of posts written by viewer',
    //   args: connectionArgs,
    //   resolve: (user, args) => connectionFromPromisedArray(PostModel.find({ userId: user._id }), args),
    // },

    // posts: {
    //   type: postConnection.connectionType,
    //   description: 'List of posts in the blog',
    //   args: {
    //     categoryId: {
    //       type: GraphQLString,
    //     },
    //     ...connectionArgs,
    //   },
    //   resolve: (user, { categoryId, ...args }) => {
    //     if (categoryId) {
    //       return connectionFromPromisedArray(PostModel.find({
    //         categories: {
    //           $in: [categoryId],
    //         },
    //       }), args)
    //     }
    //     return connectionFromPromisedArray(PostModel.find(), args)
    //   },
    // },

    latestPosts: {
      type: new GraphQLList(postType),
      description: 'Recent posts in the blog',
      args: {
        count: {
          type: new GraphQLNonNull(GraphQLInt),
          description: 'Number of recent items',
        },
      },
      resolve: (user, { count }) => PostModel.find().limit(count).sort('-date'),
    },

    authors: {
      type: new GraphQLList(authorType),
      description: 'Available authors in the blog',
      resolve: () => UserModel.find(),
    },

    author: {
      type: authorType,
      description: 'Author by _id',
      args: {
        _id: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (user, { _id }) => UserModel.findById(_id),
    },

  },
})

export default userType
