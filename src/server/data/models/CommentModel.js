import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  repliedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },
})

export default mongoose.model('Comment', CommentSchema)
