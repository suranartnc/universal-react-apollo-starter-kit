import {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} from 'graphql'

export const listArgs = {
  limit: {
    type: GraphQLInt,
    description: 'Number of recent items',
  },
}

export const singleArgs = {
  _id: {
    type: new GraphQLNonNull(GraphQLString),
  },
}
