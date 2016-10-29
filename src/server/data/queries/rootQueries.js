import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql'

import { userType } from '../types/userType'
import { postType } from '../types/postType'

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

export const viewerQuery = {
  type: userType,
  resolve: () => {
    return {
      _id: '5805c26198f0370001ac64a3', // example user
    }
  },
}
