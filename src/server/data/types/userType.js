import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from 'graphql'

import _ from 'lodash'

import postConnection from '../connections/postConnection'

import PostModel from '../models/PostModel'
import UserModel from '../models/UserModel'

import postType from './postType'
import authorType from './authorType'

import {
  listArgs,
  singleArgs,
} from '../utils/schemaUtils'

import {
  outputError,
} from '../utils/helpers'

import { connectionIdentifierArgs, connectionFromMongooseIdentifier } from '../connections/mongoConnection'

const userType = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    allPosts: {
      type: postConnection.connectionType,
      description: 'List of posts',
      args: connectionIdentifierArgs,
      resolve: (viewer, args) => {
        return connectionFromMongooseIdentifier(PostModel, args, (filter) => {
          const mappedFilter = { ...filter }

          if (mappedFilter.categoryId) {
            mappedFilter.categories = mappedFilter.categoryId
            _.unset(mappedFilter, 'categoryId')
          }

          return mappedFilter
        })
      },
    },

    myPosts: {
      type: new GraphQLList(postType),
      description: 'List of posts written by viewer',
      args: listArgs,
      resolve: (user, { limit }) => {
        if (limit >= 0) {
          return PostModel.find({
            userId: user._id,
          })
          .limit(limit).sort('-date')
          .catch(error => outputError(error))
        }
        return PostModel.find({
          userId: user._id,
        })
        .catch(error => outputError(error))
      },
    },

    posts: {
      type: new GraphQLList(postType),
      description: 'Recent posts in the blog',
      args: {
        categoryId: {
          type: GraphQLString,
        },
        offset: {
          type: GraphQLInt,
        },
        limit: {
          type: GraphQLInt,
        },
        ...listArgs,
      },
      resolve: (user, { categoryId, offset = 0, limit = 10, ...args }) => {
        const query = {
          deletedAt: null,
        }

        if (categoryId) {
          query.categories = {
            $in: [categoryId],
          }
        }

        return PostModel.find(query)
          .skip(offset)
          .limit(limit)
          .sort('-date')
          .catch(error => outputError(error))
      },
    },

    post: {
      type: postType,
      description: 'Post by _id',
      args: singleArgs,
      resolve: (user, { _id }) => PostModel.findById(_id).catch(error => outputError(error)),
    },

    authors: {
      type: new GraphQLList(authorType),
      description: 'Available authors in the blog',
      resolve: () => UserModel.find().catch(error => outputError(error)),
    },

    author: {
      type: authorType,
      description: 'Author by _id',
      args: singleArgs,
      resolve: (user, { _id }) => UserModel.findById(_id).catch(error => outputError(error)),
    },

  }),
})

export default userType
