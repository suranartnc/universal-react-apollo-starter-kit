import {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql'

import PostModel from '../models/PostModel'
import postType from '../types/postType'
import { outputError } from '../utils/helpers'

export const addPostMutation = {
  type: postType,
  description: 'Create a new post',
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) },
    excerpt: { type: GraphQLString },
    categories: { type: new GraphQLList(GraphQLString), description: 'Id of categories' },
    userId: { type: new GraphQLNonNull(GraphQLString), description: 'Id of the author' },
  },
  resolve: (source, args) => {
    const post = Object.assign({}, args)
    return PostModel.create(post).catch(error => outputError(error))
  },
}
