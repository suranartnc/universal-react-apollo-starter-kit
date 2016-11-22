import { fetchEntities, updateEntity, deleteEntityById } from 'shared/utils/apollo'

import {
  GET_POSTS,
  LIKE_POST_MUTATION,
  DELETE_POST_MUTATION,
} from 'shared/modules/post/postQueries'

export const withPosts = fetchEntities(
  'posts',
  GET_POSTS,
  {
    limit: 5,
    after: '',
  }
)

export const withLikePostFunction = updateEntity(
  'like',
  LIKE_POST_MUTATION,
  post => ({
    id: post._id,
  }),
  post => ({
    likePost: {
      ...post,
      likes: post.likes + 1,
    },
  })
)

export const withDeletePostFunction = deleteEntityById(
  'posts',
  DELETE_POST_MUTATION,
)
