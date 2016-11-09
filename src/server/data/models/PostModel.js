import mongoose from 'mongoose'
import _ from 'lodash'

const postStatus = {
  draft: 0,
  publish: 1,
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
  status: {
    type: Number,
    enum: _.values(postStatus),
    default: postStatus.draft,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
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

PostSchema.statics.softDelete = function softDelete(_id) {
  return this.findOne({ _id })
    .then((post) => {
      if (!post) {
        throw new Error(`Post ${_id} does not exists`)
      }

      post.deletedAt = Date.now() // eslint-disable-line no-param-reassign
      return post.save()
    })
}

export default mongoose.model('Post', PostSchema)
