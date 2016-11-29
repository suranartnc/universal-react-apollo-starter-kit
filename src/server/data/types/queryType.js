import {
  GraphQLObjectType,
  GraphQLList,
} from 'graphql'

import { connectionArgs } from 'graphql-relay'

import postType from './postType'
import authorType from './authorType'

import {
  listArgs,
  singleArgs,
} from '../utils/schemaUtils'

import {
  outputError,
} from '../utils/helpers'

import postConnection from '../connections/postConnection'
import connectionFromMongooseModel from '../connections/connectionFromMongooseModel'

const queryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root of the Blog Schema',
  fields: () => ({
    posts: {
      type: postConnection.connectionType,
      description: 'List of posts',
      args: connectionArgs,
      resolve: (_, args, { PostModel }) => connectionFromMongooseModel(PostModel, args),
    },

    myPosts: {
      type: new GraphQLList(postType),
      description: 'List of posts written by viewer',
      args: listArgs,
      resolve: (_, { limit }, { user, PostModel }) => {
        if (!user._id) {
          throw new Error('Required authentication')
        }

        const query = PostModel.find({
          userId: user._id,
        })
        .sort('-date')
        .catch(error => outputError(error))

        if (limit >= 0) {
          query.limit(limit)
        }

        return query
      },
    },

    post: {
      type: postType,
      description: 'Post by _id',
      args: singleArgs,
      resolve: (_, { _id }, { PostModel }) => (
        PostModel.findById(_id)
          .catch(error => outputError(error))
      ),
    },

    authors: {
      type: new GraphQLList(authorType),
      description: 'Available authors in the blog',
      resolve: (_, args, { UserModel }) => UserModel.find().catch(error => outputError(error)),
    },

    author: {
      type: authorType,
      description: 'Author by _id',
      args: singleArgs,
      resolve: (_, { _id }, { UserModel }) => (
        UserModel.findById(_id)
          .catch(error => outputError(error)
      )),
    },

  }),
})

export default queryType
