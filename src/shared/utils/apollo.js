import { graphql } from 'react-apollo'

export function fetchEntities(query, variables, props) {
  return graphql(query, {
    options: (ownProps) => {
      if (typeof variables === 'function') {
        return {
          variables: variables(ownProps),
        }
      }
      return { variables }
    },
    props,
  })
}
