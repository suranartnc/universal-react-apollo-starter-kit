import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

import {
  globalIdField,
} from 'graphql-relay'

import { nodeInterface } from '../utils/nodeDefinitions'

const categoryType = new GraphQLObjectType({
  name: 'Category',
  description: 'A Category of the blog',
  fields: () => ({
    id: globalIdField('Category', ({ _id }) => _id),
    title: { type: GraphQLString },
    slug: { type: GraphQLString },
  }),
  interfaces: [nodeInterface],
})

export default categoryType
