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
    return PostModel.update({ _id }, { $inc: { likes: 1 }, likedBy: [user._id] })
      .then(() => PostModel.findById(_id))
      .catch(error => outputError(error))
  },
}

export const deletePostMutation = {
  type: new GraphQLList(postType),
  description: 'Delete a post',
  args: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (source, { _id }) => PostModel.findById(_id).remove()
    .then(() => PostModel.find())
    .catch(error => outputError(error)),
}
