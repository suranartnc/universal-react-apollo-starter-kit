import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

const categoryType = new GraphQLObjectType({
  name: 'Category',
  description: 'A Category of the blog',
  fields: () => ({
    title: { type: GraphQLString },
    slug: { type: GraphQLString },
  }),
})

export default categoryType
