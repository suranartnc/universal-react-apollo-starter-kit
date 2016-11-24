import {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql'

import PostModel from '../models/PostModel'
import postType from '../types/postType'
import { outputError } from '../utils/helpers'

export const addPostMutation = {
  type: postType,
  description: 'Create a new post',
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) },
    excerpt: { type: GraphQLString },
    categories: { type: new GraphQLList(GraphQLString), description: 'Id of categories' },
  },
  resolve: (source, args, { user }) => {
    const post = Object.assign({}, args)
    post.userId = user._id
    return PostModel.create(post).catch(error => outputError(error))
  },
}

export const likePostMutation = {
  type: postType,
  description: 'Like a post',
  args: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (source, { _id }, { user }) => {
    if (!user._id) {
      throw new Error('Authentication is required for this function')
    }

    return PostModel.findOneAndUpdate(
      {
        _id,
        likedBy: { $ne: user._id },
      },
      {
        $inc: { likes: 1 },
        $push: { likedBy: user._id },
      },
      { new: true },
    ).then((updatedPost) => {
      if (!updatedPost) {
        throw new Error('You cannot like this post')
      }

      return updatedPost
    })
  },
}

export const deletePostMutation = {
  type: postType,
  description: 'Delete a post',
  args: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (source, { _id }, { user }) => (
    PostModel.softDelete(_id, user._id)
      .catch(err => outputError(err))
  ),
}
