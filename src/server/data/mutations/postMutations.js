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
    userId: { type: new GraphQLNonNull(GraphQLString), description: 'Id of the author' },
  },
  resolve: (source, args) => {
    const post = Object.assign({}, args)
    return PostModel.create(post).catch(error => outputError(error))
  },
}

export const likePostMutation = {
  type: postType,
  description: 'Like a post',
  args: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (source, { _id, userId }) => {
    return PostModel.update({ _id }, { likes: 1, likedBy: [userId] })
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
