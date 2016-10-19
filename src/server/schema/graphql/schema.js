import config from 'shared/configs'

import PostModel from 'server/schema/models/PostModel'
import UserModel from 'server/schema/models/UserModel'
import CategoryModel from 'server/schema/models/CategoryModel'
import CommentModel from 'server/schema/models/CommentModel'

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

function outputError(error) {
  if (config.isProduction === false) {
    return error
  }
  throw new Error('Internal Server Error')
}

const Category = new GraphQLObjectType({
  name: 'Category',
  description: 'A Category of the blog',
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    slug: { type: GraphQLString },
  }),
})

const Author = new GraphQLObjectType({
  name: 'Author',
  description: 'Represent the type of an author of a blog post or a comment',
  fields: () => ({
    _id: { type: GraphQLString },
    displayName: { type: GraphQLString },
    email: { type: GraphQLString },
    avatar: { type: GraphQLString },
  }),
})

// const HasAuthor = new GraphQLInterfaceType({
//   name: "HasAuthor",
//   description: "This type has an author",
//   fields: () => ({
//     author: {type: Author}
//   }),
//   resolveType: (obj) => {
//     if(obj.title) {
//       return Post
//     } else if(obj.replies) {
//       return Comment
//     } else {
//       return null
//     }
//   }
// })

const Comment = new GraphQLObjectType({
  name: 'Comment',
  // interfaces: [HasAuthor],
  description: 'Represent the type of a comment',
  fields: () => ({
    _id: { type: GraphQLString },
    body: { type: GraphQLString },
    date: { type: GraphQLFloat },
    author: {
      type: Author,
      resolve: comment => UserModel.findById(comment.userId),
    },
    replies: {
      type: new GraphQLList(Comment),
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

const Post = new GraphQLObjectType({
  name: 'Post',
  // interfaces: [HasAuthor],
  description: 'Represent the type of a blog post',
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    categories: {
      type: new GraphQLList(Category),
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
      type: new GraphQLList(Comment),
      args: {
        limit: {
          type: GraphQLInt,
          description: 'Limit the comments returing',
        },
      },
      resolve: (post, { limit }) => {
        if (limit >= 0) {
          return CommentModel.find({
            postId: post._id,
            repliedTo: null,
          }).limit(limit).sort('-date')
        }
        return CommentModel.find({
          postId: post._id,
          repliedTo: null,
        })
      },
    },
    author: {
      type: Author,
      resolve: post => UserModel.findById(post.userId),
    },
  }),
})

const Query = new GraphQLObjectType({
  name: 'BlogSchema',
  description: 'Root of the Blog Schema',
  fields: () => ({
    posts: {
      type: new GraphQLList(Post),
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
      type: Post,
      description: 'Post by _id',
      args: {
        _id: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (source, { _id }) => PostModel.findById(_id),
    },

    latestPosts: {
      type: new GraphQLList(Post),
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
      type: new GraphQLList(Author),
      description: 'Available authors in the blog',
      resolve: () => UserModel.find(),
    },

    author: {
      type: Author,
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

const Mutation = new GraphQLObjectType({
  name: 'BlogMutations',
  fields: {
    createPost: {
      type: Post,
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
      type: Author,
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

  },
})

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
})

export default Schema
