import { GraphQLEnumType } from 'graphql'

const mongoSortEnumType = new GraphQLEnumType({
  name: 'MongoSortEnum',
  description: 'MongoDB Sort Values',
  values: {
    ASC: {
      value: '1',
      description: 'Sort by ascending',
    },
    DESC: {
      value: '-1',
      description: 'Sort by desending',
    },
  },
})

export default mongoSortEnumType
