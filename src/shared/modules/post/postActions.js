import update from 'immutability-helper'

import {
  createEntity,
  fetchEntities,
  fetchEntity,
  updateEntity,
  deleteEntityById,
  addSubscription,
} from 'shared/utils/apollo/crud'

import {
  GET_POSTS,
  GET_POST,
  LIKE_POST_MUTATION,
  DELETE_POST_MUTATION,
  SUBMIT_POST_MUTATION,
  NEW_POSTS_SUBSCRIPTION,
} from 'shared/modules/post/postQueries'

export const withPosts = fetchEntities(
  'posts',
  GET_POSTS,
  {
    limit: 5,
    after: '',
  }
)

export const withPost = fetchEntity(GET_POST)

export const withLikePostFunction = updateEntity(
  'like',
  LIKE_POST_MUTATION,
  post => ({
    id: post._id,
    action: post.haveLiked ? 'UNLIKE' : 'LIKE',
  }),
  post => ({
    likePost: {
      ...post,
      likes: post.likes + 1,
      haveLiked: true,
    },
  })
)

export const withDeletePostFunction = deleteEntityById(
  'posts',
  DELETE_POST_MUTATION,
)

export const withSubmitPost = createEntity(SUBMIT_POST_MUTATION)

export const addNewPostsSubscription = subscribeToMore => addSubscription(
  subscribeToMore,
  NEW_POSTS_SUBSCRIPTION,
  (previousResult, { subscriptionData }) => {
    const newPost = subscriptionData.data.postAdded
    const newResult = update(previousResult, {
      posts: {
        edges: {
          $unshift: [{
            node: newPost,
          }],
        },
      },
    })
    return newResult
  }
)
