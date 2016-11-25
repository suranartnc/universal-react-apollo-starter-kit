import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

const authorType = new GraphQLObjectType({
  name: 'Author',
  description: 'Represent the type of an author of a blog post or a comment',
  fields: () => ({
    _id: { type: GraphQLString },
    displayName: { type: GraphQLString },
    email: { type: GraphQLString },
    avatar: { type: GraphQLString },
  }),
})

export default authorType
