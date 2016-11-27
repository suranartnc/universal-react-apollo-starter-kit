import ApolloClient from 'apollo-client'

export default options => new ApolloClient(Object.assign({}, {
  dataIdFromObject: (object) => {
    if (!object._id || !object.__typename) {
      return null
    }
    return `${object.__typename}:${object._id}`
  },
}, options))
