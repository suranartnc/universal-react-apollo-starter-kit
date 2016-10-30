import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

import {
  globalIdField,
} from 'graphql-relay'

import nodeInterface from '../types/nodeInterfaceType'

const categoryType = new GraphQLObjectType({
  name: 'Category',
  description: 'A Category of the blog',
  interfaces: [nodeInterface],
  isTypeOf: (object) => {
    if (object.title && object.slug) {
      return true
    }
    return false
  },
  fields: () => ({
    id: globalIdField('Category', ({ _id }) => _id),
    title: { type: GraphQLString },
    slug: { type: GraphQLString },
  }),
})

export default categoryType
