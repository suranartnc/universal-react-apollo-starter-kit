import { graphql } from 'react-apollo'
import { fetchEntities } from 'shared/utils/apollo'

import {
  GET_POSTS,
  LIKE_POST_MUTATION,
  DELETE_POST_MUTATION,
} from 'shared/modules/post/postQueries'

export const withPosts = fetchEntities(GET_POSTS, {
  limit: 5,
  after: '',
})

const likePostFunction = mutate => post => mutate({
  variables: { id: post._id },
  optimisticResponse: {
    __typename: 'Mutation',
    likePost: {
      ...post,
      __typename: 'Post',
      likes: post.likes + 1,
    },
  },
})

export const withLikePostFunction = graphql(LIKE_POST_MUTATION, {
  props: ({ mutate }) => ({
    like: likePostFunction(mutate),
  }),
})

const deletePost = mutate => post => mutate({
  variables: { id: post._id },
  optimisticResponse: {
    deletePost: {
      ...post,
      __typename: 'Post',
    },
  },
  updateQueries: {
    getPosts: (previousResult, { mutationResult }) => {
      const { viewer: { posts: { edges } } } = previousResult

      const nonDeletedEdges = edges.filter(edge => (
        edge.node._id !== mutationResult.data.deletePost._id
      ))

      return {
        ...previousResult,
        viewer: {
          ...previousResult.viewer,
          posts: {
            ...previousResult.viewer.posts,
            edges: nonDeletedEdges,
          },
        },
      }
    },
  },
})

export const withDeletePostFunction = graphql(DELETE_POST_MUTATION, {
  props: ({ mutate }) => ({
    delete: deletePost(mutate),
  }),
})
