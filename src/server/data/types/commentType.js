import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
} from 'graphql'

import CommentModel from '../models/CommentModel'

import authorType from './authorType'

import {
  outputError,
} from '../utils/helpers'

const commentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'Represent the type of a comment',
  fields: () => ({
    _id: { type: GraphQLString },
    body: { type: GraphQLString },
    date: { type: GraphQLFloat },
    author: {
      type: authorType,
      resolve: (comment, args, { UserModel }) => (
        UserModel.findById(comment.userId)
          .catch(error => outputError(error)
      )),
    },
    replies: {
      type: new GraphQLList(commentType),
      description: 'Replies for the comment',
      args: {
        limit: {
          type: GraphQLInt,
          description: 'Limit the replies returing',
        },
      },
      resolve: (comment, { limit }) => {
        if (limit >= 0) {
          return CommentModel.find({
            repliedTo: comment._id,
          })
          .limit(limit).sort('-date')
          .catch(error => outputError(error))
        }
        return CommentModel.find({
          repliedTo: comment._id,
        })
        .catch(error => outputError(error))
      },
    },
  }),
})

export default commentType
