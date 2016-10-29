import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql'

import {
  globalIdField,
  connectionArgs,
  connectionFromPromisedArray,
  connectionDefinitions,
} from 'graphql-relay'

import PostModel from '../models/PostModel'
import UserModel from '../models/UserModel'

import nodeInterface from '../types/nodeInterfaceType'
import postType from './postType'
import authorType from './authorType'

const {
  connectionType: postConnection,
} = connectionDefinitions({
  name: 'Post',
  nodeType: postType,
})

const userType = new GraphQLObjectType({
  name: 'Viewer',
  interfaces: [nodeInterface],
  isTypeOf: (object) => {
    if (object.myPosts) {
      return true
    }
    return false
  },
  fields: {
    id: globalIdField('User', ({ _id }) => _id),

    myPosts: {
      type: postConnection,
      description: 'List of posts written by viewer',
      args: connectionArgs,
      resolve: (user, args) => connectionFromPromisedArray(PostModel.find({ userId: user._id }), args),
    },

    posts: {
      type: postConnection,
      description: 'List of posts in the blog',
      args: {
        categoryId: {
          type: GraphQLString,
        },
        ...connectionArgs,
      },
      resolve: (user, { categoryId, ...args }) => {
        if (categoryId) {
          return connectionFromPromisedArray(PostModel.find({
            categories: {
              $in: [categoryId],
            },
          }), args)
        }
        return connectionFromPromisedArray(PostModel.find(), args)
      },
    },

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
