import mongoose from 'mongoose'
import _ from 'lodash'
import sanitizeHtml from 'sanitize-html'

const postStatus = {
  draft: 0,
  publish: 1,
}

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  body: String,
  thumbnail: String,
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
  staffpick: {
    type: Boolean,
    indexed: true,
    default: false,
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

PostSchema.pre('save', function generateExcerpt(next) {
  const excerpt = sanitizeHtml(this.body, {
    allowedTags: [],
  })

  this.excerpt = _.truncate(excerpt, {
    length: 150,
  })

  next()
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

PostSchema.statics.softDelete = function softDelete(_id, userId) {
  return this.findOne({ _id })
    .then((post) => {
      if (!post) {
        throw new Error(`Post ${_id} does not exists`)
      }
      if (post.userId.toString() !== userId) {
        throw new Error('Permission denied')
      }
      post.deletedAt = Date.now() // eslint-disable-line no-param-reassign
      return post.save()
    })
}

function beforeFind(next) {
  this.where('deletedAt').equals(null)
  next()
}

PostSchema.pre('find', beforeFind)
PostSchema.pre('findOne', beforeFind)

export default mongoose.model('Post', PostSchema)
