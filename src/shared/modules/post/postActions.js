import { graphql } from 'react-apollo'

import {
  GET_POSTS,
  LIKE_POST_MUTATION,
  DELETE_POST_MUTATION,
} from 'shared/modules/post/postQueries'

export const withPosts = graphql(GET_POSTS, {
  options: () => ({
    variables: {
      limit: 5,
      after: '',
    },
  }),

  props: (fetchResult) => {
    const { data: { loading, viewer: { posts = {} } = {}, fetchMore } } = fetchResult

    const { edges = [], pageInfo = {} } = posts

    const { hasNextPage } = pageInfo

    return {
      loading,
      posts: edges.map(edge => edge.node),
      hasNextPage,
      loadMorePosts: () => fetchMore({
        variables: {
          after: pageInfo.endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult.data) {
            return previousResult
          }

          return {
            ...fetchMoreResult.data,
            viewer: {
              ...fetchMoreResult.data.viewer,
              posts: {
                ...fetchMoreResult.data.viewer.posts,
                edges: [
                  ...previousResult.viewer.posts.edges,
                  ...fetchMoreResult.data.viewer.posts.edges,
                ],
              },
            },
          }
        },
      }),
    }
  },
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
