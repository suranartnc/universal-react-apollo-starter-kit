import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql'

import postType from '../types/postType'

import PostModel from '../models/PostModel'

export const postQuery = {
  type: postType,
  description: 'Post by _id',
  args: {
    _id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (user, { _id }) => PostModel.findById(_id),
}
