import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
} from 'graphql'

import UserModel from '../models/UserModel'
import CommentModel from '../models/CommentModel'
import CategoryModel from '../models/CategoryModel'

import categoryType from './categoryType'
import authorType from './authorType'

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
    // comments: {
    //   type: commentConnection.connectionType,
    //   description: 'A post\'s collection of comments',
    //   args: connectionArgs,
    //   resolve: (post, args) => connectionFromPromisedArray(CommentModel.find({
    //     postId: post._id,
    //     repliedTo: null,
    //   }), args),
    // },
    author: {
      type: authorType,
      resolve: post => UserModel.findById(post.userId),
    },
  }),
})

export default postType
