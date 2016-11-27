import { graphql } from 'react-apollo'
import update from 'immutability-helper'

export function createEntity(query) {
  return graphql(query, {
    props: ({ mutate }) => ({
      submit: item => mutate({
        variables: item,
      }),
    }),
  })
}

export function fetchEntity(query) {
  return graphql(query, {
    options: ({ params }) => ({
      variables: {
        id: params.id,
      },
    }),
  })
}

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
          refetch,
          fetchMore,
          subscribeToMore,
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
        refetch,
        subscribeToMore,
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

export function updateEntity(action, query, variables, mutation) {
  return graphql(query, {
    props: ({ mutate }) => ({
      [action]: item => mutate({
        variables: variables(item),
        optimisticResponse: {
          ...mutation(item),
        },
      }),
    }),
  })
}

export function deleteEntityById(entityName, query) {
  return graphql(query, {
    props: ({ mutate }) => ({
      delete: item => mutate({
        variables: {
          id: item._id,
        },
        updateQueries: {
          getPosts: (previousResult) => {
            const { viewer: { posts: { edges } } } = previousResult
            return update(previousResult, {
              viewer: {
                [entityName]: {
                  edges: {
                    $set: edges.filter(edge => (
                      edge.node._id !== item._id
                    )),
                  },
                },
              },
            })
          },
        },
      }),
    }),
  })
}

export function addSubscription(subscribeToMore, query, updateQuery) {
  return subscribeToMore({
    document: query,
    // variables: {},
    updateQuery,
  })
}
