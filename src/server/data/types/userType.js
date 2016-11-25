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

const userType = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    posts: {
      type: postConnection.connectionType,
      description: 'List of posts',
      args: connectionArgs,
      resolve: (viewer, args, { PostModel }) => connectionFromMongooseModel(PostModel, args),
    },

    myPosts: {
      type: new GraphQLList(postType),
      description: 'List of posts written by viewer',
      args: listArgs,
      resolve: (viewer, { limit }, { PostModel }) => {
        if (!viewer._id) {
          throw new Error('Required authentication')
        }

        const query = PostModel.find({
          userId: viewer._id,
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
      resolve: (viewer, { _id }, { PostModel }) => (
        PostModel.findById(_id)
          .catch(error => outputError(error))
      ),
    },

    authors: {
      type: new GraphQLList(authorType),
      description: 'Available authors in the blog',
      resolve: (viewer, args, { UserModel }) => UserModel.find().catch(error => outputError(error)),
    },

    author: {
      type: authorType,
      description: 'Author by _id',
      args: singleArgs,
      resolve: (viewer, { _id }, { UserModel }) => (
        UserModel.findById(_id)
          .catch(error => outputError(error)
      )),
    },

  }),
})

export default userType
