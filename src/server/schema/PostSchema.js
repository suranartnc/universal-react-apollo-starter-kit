import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  excerpt: {
    type: String,
  },
  avatar: {
    type: String,
  },
  name: {
    type: String,
  },
  tags: {
    type: [String],
  },
  likes: {
    type: Number,
  },
  comments: {
    type: Number,
  },
  shares: {
    type: Number,
  },
  staffpick: {
    type: Boolean,
  },
  pubDate: {
    type: Number,
  },
  pubDateReadable: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

const Post = mongoose.model('Post', PostSchema)

export default Post
