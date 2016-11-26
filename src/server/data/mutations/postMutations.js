import {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType,
} from 'graphql'

import { pubsub } from '../subscriptions/helpers'
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
  resolve: (source, args, { user, PostModel }) => {
    const post = Object.assign({}, args)
    post.userId = user._id
    return PostModel.create(post).catch(error => outputError(error))
      .then(({ _id }) => PostModel.findById(_id))
      .then((postAdded) => {
        pubsub.publish('postAdded', postAdded)
        return postAdded
      })
  },
}

const LIKE_POST = 'like'
const UNLIKE_POST = 'unlike'

const likePostMutationAction = new GraphQLEnumType({
  name: 'LikePostMutationAction',
  description: 'Action for like mutation',
  values: {
    LIKE: {
      value: LIKE_POST,
      description: 'Like a post',
    },
    UNLIKE: {
      value: UNLIKE_POST,
      description: 'Unlike a post',
    },
  },
})

export const likePostMutation = {
  type: postType,
  description: 'Like a post',
  args: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
    action: { type: new GraphQLNonNull(likePostMutationAction) },
  },
  resolve: (source, { _id, action }, { user, PostModel }) => {
    if (!user._id) {
      throw new Error('Authentication is required for this function')
    }

    const condition = { _id }

    const update = {
      likes: -1,
      operation: '$pull',
    }

    if (action === LIKE_POST) {
      condition.likedBy = { $ne: user._id }

      update.likes = 1
      update.operation = '$push'
    }

    return PostModel.findOneAndUpdate(
      condition,
      {
        $inc: { likes: update.likes },
        [update.operation]: { likedBy: user._id },
      },
      { new: true },
    ).then((updatedPost) => {
      if (!updatedPost) {
        throw new Error(`You cannot ${action} this post`)
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
  resolve: (source, { _id }, { user, PostModel }) => (
    PostModel.softDelete(_id, user._id)
      .catch(err => outputError(err))
  ),
}
