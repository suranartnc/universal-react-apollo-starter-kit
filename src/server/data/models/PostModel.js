import mongoose from 'mongoose'
import _ from 'lodash'

const postStatus = {
  draft: 0,
  publish: 1,
  delete: 2,
  ban: 3,
}

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
  status: {
    type: Number,
    enum: _.values(postStatus),
    default: postStatus.draft,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

PostSchema.set('toObject', {
  virtuals: true,
})

PostSchema.set('toJSON', {
  virtuals: true,
})

PostSchema.virtual('statusName').get(function getStatusName() {
  return _.findKey(postStatus, status => status === this.status)
})

export default mongoose.model('Post', PostSchema)
