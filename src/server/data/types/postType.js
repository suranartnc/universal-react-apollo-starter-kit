import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
} from 'graphql'

import {
  globalIdField,
  connectionArgs,
  connectionFromPromisedArray,
} from 'graphql-relay'

import { nodeInterface } from '../utils/nodeDefinitions'

import UserModel from '../models/UserModel'
import CommentModel from '../models/CommentModel'
import CategoryModel from '../models/CategoryModel'

import categoryType from './categoryType'
import authorType from './authorType'

const postType = new GraphQLObjectType({
  name: 'Post',
  description: 'Represent the type of a blog post',
  fields: () => ({
    id: globalIdField('Post', ({ _id }) => _id),
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    categories: {
      type: new GraphQLList(categoryType),
      resolve: post => CategoryModel.find({
        _id: {
          $in: post.categories,
        },
      }),
    },
    excerpt: { type: GraphQLString },
    body: { type: GraphQLString },
    date: {
      type: GraphQLFloat,
      resolve: (post) => {
        if (post.date) {
          return new Date(post.date).getTime()
        }
        return null
      },
    },
    comments: {
      type: commentConnection,
      description: 'A post\'s collection of comments',
      args: connectionArgs,
      resolve: (post, args) => connectionFromPromisedArray(CommentModel.find({
        postId: post._id,
        repliedTo: null,
      }), args),
    },
    author: {
      type: authorType,
      resolve: post => UserModel.findById(post.userId),
    },
  }),
  interfaces: [nodeInterface],
})

export default postType
