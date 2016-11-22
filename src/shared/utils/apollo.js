import { graphql } from 'react-apollo'

export function fetchEntities(query, variables, reducer) {
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
}
