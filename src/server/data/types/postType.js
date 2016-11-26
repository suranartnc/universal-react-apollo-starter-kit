import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql'

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
      resolve: (post, args, { CategoryModel }) => (
        CategoryModel.find({
          _id: {
            $in: post.categories,
          },
        })
        .catch(error => outputError(error))
      ),
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
      resolve: (post, { limit }, { CommentModel }) => {
        const query = CommentModel.find({
          postId: post._id,
          repliedTo: null,
        })
        .sort('-date')
        .catch(error => outputError(error))

        if (limit > 0) {
          query.limit(limit)
        }

        return query
      },
    },
    author: {
      type: authorType,
      resolve: (post, args, { UserModel }) => (
        UserModel.findById(post.userId)
          .catch(error => outputError(error)
      )),
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
