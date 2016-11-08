import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
  type: String,
  title: {
    type: String,
    trim: true,
  },
  body: String,
  excerpt: String,
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }],
  tags: [String],
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  shares: {
    type: Number,
    min: 0,
  },
  comments: [{
    body: String,
    date: Date,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }],
  staffpick: {
    type: Boolean,
    indexed: true,
  },
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
