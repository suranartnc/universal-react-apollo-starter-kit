import ApolloClient, { addTypename } from 'apollo-client'

export default options => new ApolloClient(Object.assign({}, {
  queryTransformer: addTypename,
  dataIdFromObject: (object) => {
    if (!object._id || !object.__typename) {
      return null
    }

    return `${object.__typename}:${object._id}`
  },
}, options))
