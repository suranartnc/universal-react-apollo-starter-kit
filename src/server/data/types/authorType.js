import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

import {
  globalIdField,
} from 'graphql-relay'

import nodeInterface from '../types/nodeInterfaceType'

const authorType = new GraphQLObjectType({
  name: 'Author',
  description: 'Represent the type of an author of a blog post or a comment',
  interfaces: [nodeInterface],
  isTypeOf: (object) => {
    if (object.displayName && object.email) {
      return true
    }
    return false
  },
  fields: () => ({
    id: globalIdField('Author', ({ _id }) => _id),
    displayName: { type: GraphQLString },
    email: { type: GraphQLString },
    avatar: { type: GraphQLString },
  }),
})

export default authorType
