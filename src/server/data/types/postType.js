import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql'

import UserModel from '../models/UserModel'
import CommentModel from '../models/CommentModel'
import CategoryModel from '../models/CategoryModel'
import categoryType from './categoryType'
import authorType from './authorType'
import commentType from './commentType'
import { listArgs } from '../utils/schemaUtils'
import {
  outputError,
} from '../utils/helpers'

const postType = new GraphQLObjectType({
  name: 'Post',
  description: 'Represent the type of a blog post',
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    categories: {
      type: new GraphQLList(categoryType),
      resolve: post => CategoryModel.find({
        _id: {
          $in: post.categories,
        },
      })
      .catch(error => outputError(error)),
    },
    excerpt: { type: GraphQLString },
    body: { type: GraphQLString },
    thumbnail: { type: GraphQLString },
    staffpick: { type: GraphQLBoolean },
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
      type: new GraphQLList(commentType),
      description: 'A post\'s collection of comments',
      args: listArgs,
      resolve: (post, { limit }) => {
        if (limit > 0) {
          CommentModel.find({
            postId: post._id,
            repliedTo: null,
          })
          .limit(limit)
          .sort('-date')
          .catch(error => outputError(error))
        }
        return CommentModel.find({
          postId: post._id,
          repliedTo: null,
        }).catch(error => outputError(error))
      },
    },
    author: {
      type: authorType,
      resolve: post => UserModel.findById(post.userId).catch(error => outputError(error)),
    },
    likes: { type: GraphQLInt },
    haveLiked: {
      type: GraphQLBoolean,
      resolve: (post, args, { user }) => {
        if (!user) {
          return false
        }

        if (!post.likedBy) {
          return false
        }

        return post.likedBy.indexOf(user._id) !== -1
      },
    },
    status: {
      type: GraphQLString,
      resolve: post => post.statusName,
    },
  }),
})

export default postType
