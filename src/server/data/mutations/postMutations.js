import {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql'

import {
  mutationWithClientMutationId,
  cursorForObjectInConnection,
} from 'graphql-relay'

import PostModel from './models/PostModel'

import userType from '../types/userType'

import { outputError } from '../helpers'

export const addPostMutation = mutationWithClientMutationId({
  name: 'AddPost',
  inputFields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) },
    excerpt: { type: GraphQLString },
    categories: { type: new GraphQLList(GraphQLString), description: 'Id of categories' },
    userId: { type: new GraphQLNonNull(GraphQLString), description: 'Id of the author' },
  },
  outputFields: {
    postEdge: {
      type: postEdge,
      resolve: postItem => PostModel.find()
        .then((allPosts) => {
          let postToFindIndex
          for (const post of allPosts) {
            if (post._id.toString() === postItem._id.toString()) {
              postToFindIndex = post
            }
          }
          const cursorId = cursorForObjectInConnection(allPosts, postToFindIndex)
          return {
            node: postItem,
            cursor: cursorId,
          }
        }),
    },
    viewer: {
      type: userType,
      resolve: () => {
        return {
          _id: '5805c26198f0370001ac64a3', // example user
        }
      },
    },
  },
  mutateAndGetPayload: post => PostModel.create(post).catch(error => outputError(error)),
})
