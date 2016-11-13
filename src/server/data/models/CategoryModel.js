import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
  type: String,
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Category', CategorySchema, 'categories')
