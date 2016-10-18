import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
  body: String,
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

export default mongoose.model('Comment', CommentSchema)
