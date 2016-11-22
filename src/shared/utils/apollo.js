import { graphql } from 'react-apollo'
import update from 'immutability-helper'

export function fetchEntities(query, variables) {
  return graphql(query, {
    options: (ownProps) => {
      if (typeof variables === 'function') {
        return {
          variables: variables(ownProps),
        }
      }
      return { variables }
    },
    props: (fetchResult) => {
      const {
        data: {
          loading,
          fetchMore,
          viewer: {
            posts: {
              edges = [],
              pageInfo = {},
            } = {},
          } = {},
        },
      } = fetchResult

      return {
        loading,
        hasNextPage: pageInfo.hasNextPage,
        posts: edges.map(edge => edge.node),
        loadMorePosts: () => fetchMore({
          variables: {
            after: pageInfo.endCursor,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult.data) {
              return previousResult
            }
            return update(previousResult, {
              viewer: {
                posts: {
                  pageInfo: {
                    $set: fetchMoreResult.data.viewer.posts.pageInfo,
                  },
                  edges: {
                    $push: fetchMoreResult.data.viewer.posts.edges,
                  },
                },
              },
            })
          },
        }),
      }
    },
  })
}
