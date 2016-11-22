import { graphql } from 'react-apollo'
import update from 'immutability-helper'

export function fetchEntities(entityName, query, variables) {
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
            [entityName]: {
              edges = [],
              pageInfo = {},
            } = {},
          } = {},
        },
      } = fetchResult

      return {
        loading,
        hasNextPage: pageInfo.hasNextPage,
        [entityName]: edges.map(edge => edge.node),
        loadMore: () => fetchMore({
          variables: {
            after: pageInfo.endCursor,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult.data) {
              return previousResult
            }
            return update(previousResult, {
              viewer: {
                [entityName]: {
                  pageInfo: {
                    $set: fetchMoreResult.data.viewer[entityName].pageInfo,
                  },
                  edges: {
                    $push: fetchMoreResult.data.viewer[entityName].edges,
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
