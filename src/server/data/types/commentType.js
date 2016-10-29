import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
} from 'graphql'

import {
  globalIdField,
} from 'graphql-relay'

import UserModel from '../models/UserModel'
import CommentModel from '../models/CommentModel'

import nodeInterface from '../types/nodeInterfaceType'
import authorType from './authorType'

const commentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'Represent the type of a comment',
  interfaces: [nodeInterface],
  isTypeOf: (object) => {
    if (!object.title && object.body && object.replies) {
      return true
    }
    return false
  },
  fields: () => ({
    id: globalIdField('Comment', ({ _id }) => _id),
    body: { type: GraphQLString },
    date: { type: GraphQLFloat },
    author: {
      type: authorType,
      resolve: comment => UserModel.findById(comment.userId),
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
          }).limit(limit).sort('-date')
        }
        return CommentModel.find({
          repliedTo: comment._id,
        })
      },
    },
  }),
})

export default commentType
