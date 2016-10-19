import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
    default: mongoose.Types.ObjectId,
  },
  type: String,
  title: {
    type: String,
  },
  slug: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Category', CategorySchema, 'categories')
