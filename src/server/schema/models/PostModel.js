import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
  title: String,
  body: String,
  excerpt: String,
  tags: [String],
  likes: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }],
  shares: Number,
  comments: [{
    body: String,
    date: Date,
  }],
  staffpick: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

export default mongoose.model('Post', PostSchema)
