import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Postchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  subTitle: {
    type: String,
    default: ''
  },
  count: {
    type: Number,
    default: 0
  },
  categories: {
    type: String,
    default: '默认'
  },
  tags: {
    type: [String],
    default: []
  },
  summary: {
    type: String,
    default: ''
  },
  deleted: {
    type: Boolean,
    default: false
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

Postchema.pre('save', function (next) {
  if (this.isNew) {
    if (!this.meta.createdAt) {
      this.meta.createdAt = this.meta.updateAt = Date.now()
    } else {
      this.meta.updatedAt = this.meta.createdAt
    }
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

mongoose.model('Post', Postchema)
