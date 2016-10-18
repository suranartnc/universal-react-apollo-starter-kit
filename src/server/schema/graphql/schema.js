import * as _ from 'underscore'

import PostsList from 'server/data/posts'
import AuthorsMap from 'server/data/authors'
// import { CommentList, ReplyList } from 'server/data/comments'

import PostModel from 'server/schema/models/PostModel'
import UserModel from 'server/schema/models/UserModel'
import CategoryModel from 'server/schema/models/CategoryModel'

import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLInterfaceType,
} from 'graphql'

const Category = new GraphQLObjectType({
  name: "Category",
  description: "A Category of the blog",
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    slug: { type: GraphQLString },
  }),
})

const Author = new GraphQLObjectType({
  name: "Author",
  description: "Represent the type of an author of a blog post or a comment",
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

// const Comment = new GraphQLObjectType({
//   name: "Comment",
//   interfaces: [HasAuthor],
//   description: "Represent the type of a comment",
//   fields: () => ({
//     _id: {type: GraphQLString},
//     content: {type: GraphQLString},
//     author: {
//       type: Author,
//       resolve: function({author}) {
//         return AuthorsMap[author]
//       }
//     },
//     timestamp: {type: GraphQLFloat},
//     replies: {
//       type: new GraphQLList(Comment),
//       description: "Replies for the comment",
//       resolve: function() {
//         return ReplyList
//       }
//     }
//   })
// })

const Post = new GraphQLObjectType({
  name: "Post",
  // interfaces: [HasAuthor],
  description: "Represent the type of a blog post",
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    categories: {
      type: new GraphQLList(Category),
      resolve: ({ categories }) => {
        return CategoryModel.find({ _id: { $in: categories } })
      },
    },
    excerpt: { type: GraphQLString },
    body: { type: GraphQLString },
    date: {
      type: GraphQLFloat,
      resolve: (post) => {
        if (post.date) {
          return new Date(post.date['$date']).getTime()
        } else {
          return null
        }
      }
    },
    // comments: {
    //   type: new GraphQLList(Comment),
    //   args: {
    //     limit: {type: GraphQLInt, description: "Limit the comments returing"}
    //   },
    //   resolve: function(post, {limit}) {
    //     if(limit >= 0) {
    //       return CommentList.slice(0, limit)
    //     }

    //     return CommentList
    //   }
    // },
    author: {
      type: Author,
      resolve: ({ userId }) => {
        // return AuthorsMap[author]
        return UserModel.findById(userId)
      }
    }
  })
})

const Query = new GraphQLObjectType({
  name: 'BlogSchema',
  description: 'Root of the Blog Schema',
  fields: () => ({
    posts: {
      type: new GraphQLList(Post),
      description: 'List of posts in the blog',
      args: {
        category: { type: GraphQLString },
      },
      resolve: (source, { category }) => {
        if (category) {
          return PostModel.find({ category })
        }
        return PostModel.find()
      },
    },

    // latestPost: {
    //   type: Post,
    //   description: "Latest post in the blog",
    //   resolve: function() {
    //     PostsList.sort((a, b) => {
    //       var bTime = new Date(b.date['$date']).getTime()
    //       var aTime = new Date(a.date['$date']).getTime()

    //       return bTime - aTime
    //     })

    //     return PostsList[0]
    //   }
    // },

    // recentPosts: {
    //   type: new GraphQLList(Post),
    //   description: "Recent posts in the blog",
    //   args: {
    //     count: {type: new GraphQLNonNull(GraphQLInt), description: 'Number of recent items'}
    //   },
    //   resolve: function(source, {count}) {
    //     PostsList.sort((a, b) => {
    //       var bTime = new Date(b.date['$date']).getTime()
    //       var aTime = new Date(a.date['$date']).getTime()

    //       return bTime - aTime
    //     })

    //     return PostsList.slice(0, count)
    //   }
    // },

    post: {
      type: Post,
      description: 'Post by _id',
      args: {
        _id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (source, { _id }) => {
        return PostModel.findById(_id)
      },
    },

    // authors: {
    //   type: new GraphQLList(Author),
    //   description: "Available authors in the blog",
    //   resolve: function() {
    //     return _.values(AuthorsMap)
    //   }
    // },

    // author: {
    //   type: Author,
    //   description: "Author by _id",
    //   args: {
    //     _id: {type: new GraphQLNonNull(GraphQLString)}
    //   },
    //   resolve: function(source, {_id}) {
    //     return AuthorsMap[_id]
    //   }
    // }
  })
})

// const Mutation = new GraphQLObjectType({
//   name: "BlogMutations",
//   fields: {
//     createPost: {
//       type: Post,
//       description: "Create a new blog post",
//       args: {
//         _id: { type: new GraphQLNonNull(GraphQLString) },
//         title: { type: new GraphQLNonNull(GraphQLString) },
//         content: { type: new GraphQLNonNull(GraphQLString) },
//         summary: { type: GraphQLString },
//         category: { type: new GraphQLList(GraphQLString), description: 'Id of categories' },
//         author: { type: new GraphQLNonNull(GraphQLString), description: 'Id of the author' },
//       },
//       resolve: function(source, {...args}) {
//         let post = args
//         var alreadyExists = _.findIndex(PostsList, p => p._id === post._id) >= 0
//         if(alreadyExists) {
//           throw new Error("Post already exists: " + post._id)
//         }

//         if(!AuthorsMap[post.author]) {
//           throw new Error("No such author: " + post.author)
//         }

//         if(!post.summary) {
//           post.summary = post.content.substring(0, 100)
//         }

//         post.comments = []
//         post.date = {$date: new Date().toString()}

//         PostsList.push(post)
//         return post
//       }
//     },

//     createAuthor: {
//       type: Author,
//       description: "Create a new author",
//       args: {
//         _id: {type: new GraphQLNonNull(GraphQLString)},
//         name: {type: new GraphQLNonNull(GraphQLString)},
//         twitterHandle: {type: GraphQLString}
//       },
//       resolve: function(source, {...args}) {
//         let author = args
//         if(AuthorsMap[args._id]) {
//           throw new Error("Author already exists: " + author._id)
//         }

//         AuthorsMap[author._id] = author
//         return author
//       }
//     }
//   }
// })

const Schema = new GraphQLSchema({
  query: Query,
  // mutation: Mutation
})

export default Schema
