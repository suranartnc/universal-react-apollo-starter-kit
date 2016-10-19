import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  // GraphQLEnumType,
  GraphQLNonNull,
  // GraphQLInterfaceType,
} from 'graphql'

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  cursorForObjectInConnection,
} from 'graphql-relay'

import config from 'shared/configs'

import PostModel from './models/PostModel'
import UserModel from './models/UserModel'
import CategoryModel from './models/CategoryModel'
import CommentModel from './models/CommentModel'

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId)
    if (type === 'User') {
      return getUser(id)
    } else if (type === 'Feature') {
      return getFeature(id)
    }
    return null
  },
  (obj) => {
    if (obj instanceof User) {
      return userType
    } else if (obj instanceof Feature) {
      return featureType
    }
    return null
  }
)

/**
 * Define your own types here
 */

function outputError(error) {
  if (config.isProduction === false) {
    return error
  }
  throw new Error('Internal Server Error')
}

const categoryType = new GraphQLObjectType({
  name: 'Category',
  description: 'A Category of the blog',
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    slug: { type: GraphQLString },
  }),
})

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

const commentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'Represent the type of a comment',
  fields: () => ({
    _id: { type: GraphQLString },
    body: { type: GraphQLString },
    date: { type: GraphQLFloat },
    author: {
      type: authorType,
      resolve: comment => UserModel.findById(comment.userId),
    },
    replies: {
      type: new GraphQLList(commentType),
      description: 'Replies for the comment',
      args: {
        limit: {
          type: GraphQLInt,
          description: 'Limit the replies returing',
        },
      },
      resolve: (comment, { limit }) => {
        if (limit >= 0) {
          return CommentModel.find({
            repliedTo: comment._id,
          }).limit(limit).sort('-date')
        }
        return CommentModel.find({
          repliedTo: comment._id,
        })
      },
    }
  }),
})

const { connectionType: commentConnection } = connectionDefinitions({
  name: 'Comment',
  nodeType: commentType,
})

const postType = new GraphQLObjectType({
  name: 'Post',
  description: 'Represent the type of a blog post',
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    categories: {
      type: new GraphQLList(categoryType),
      resolve: post => CategoryModel.find({
        _id: {
          $in: post.categories,
        },
      }),
    },
    excerpt: { type: GraphQLString },
    body: { type: GraphQLString },
    date: {
      type: GraphQLFloat,
      resolve: (post) => {
        if (post.date) {
          return new Date(post.date).getTime()
        }
        return null
      },
    },
    comments: {
      type: commentConnection,
      description: 'A post\'s collection of comments',
      args: connectionArgs,
      resolve: (post, args) => CommentModel.find({
        postId: post._id,
        repliedTo: null,
      }).then(result => connectionFromArray(result, args)),
    },
    author: {
      type: authorType,
      resolve: post => UserModel.findById(post.userId),
    },
  }),
})

const queryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root of the Blog Schema',
  fields: () => ({
    node: nodeField,
    posts: {
      type: new GraphQLList(postType),
      description: 'List of posts in the blog',
      args: {
        categoryId: { type: GraphQLString },
      },
      resolve: (source, { categoryId }) => {
        if (categoryId) {
          return PostModel.find({
            categories: {
              $in: [categoryId],
            },
          })
        }
        return PostModel.find()
      },
    },

    post: {
      type: postType,
      description: 'Post by _id',
      args: {
        _id: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (source, { _id }) => PostModel.findById(_id),
    },

    latestPosts: {
      type: new GraphQLList(postType),
      description: 'Recent posts in the blog',
      args: {
        count: {
          type: new GraphQLNonNull(GraphQLInt),
          description: 'Number of recent items',
        },
      },
      resolve: (source, { count }) => PostModel.find().limit(count).sort('-date'),
    },

    authors: {
      type: new GraphQLList(authorType),
      description: 'Available authors in the blog',
      resolve: () => UserModel.find(),
    },

    author: {
      type: authorType,
      description: 'Author by _id',
      args: {
        _id: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (source, { _id }) => UserModel.findById(_id),
    },
  }),
})

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPost: {
      type: postType,
      description: 'Create a new blog post',
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
    },

    createAuthor: {
      type: authorType,
      description: 'Create a new author',
      args: {
        displayName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        avatar: { type: GraphQLString },
      },
      resolve: (source, args) => {
        const author = Object.assign({}, args)
        return UserModel.create(author).catch(error => outputError(error))
      },
    },

    createComment: {
      type: postType,
      description: 'Create a new comment',
      args: {
        body: { type: new GraphQLNonNull(GraphQLString) },
        postId: { type: new GraphQLNonNull(GraphQLString) },
        repliedTo: { type: GraphQLString },
        userId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (source, args) => {
        const comment = Object.assign({}, args)
        return CommentModel.create(comment)
          .then(result => PostModel.findById(result.postId))
          .catch(error => outputError(error))
      },
    },

  },
})

const Schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
})

export default Schema
