import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
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
