import { createEntity, fetchEntities, fetchEntity, updateEntity, deleteEntityById } from 'shared/utils/apollo'

import {
  GET_POSTS,
  GET_POST,
  LIKE_POST_MUTATION,
  DELETE_POST_MUTATION,
  SUBMIT_POST_MUTATION,
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
