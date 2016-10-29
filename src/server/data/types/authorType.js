import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

import {
  globalIdField,
} from 'graphql-relay'

import { nodeInterface } from '../utils/nodeDefinitions'

const authorType = new GraphQLObjectType({
  name: 'Author',
  description: 'Represent the type of an author of a blog post or a comment',
  fields: () => ({
    id: globalIdField('Author', ({ _id }) => _id),
    displayName: { type: GraphQLString },
    email: { type: GraphQLString },
    avatar: { type: GraphQLString },
  }),
  interfaces: [nodeInterface],
})

export default authorType
