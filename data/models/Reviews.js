const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReviewSchema = new Schema({
  userPosting: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  showOnSite: {
    type: Boolean,
    required: true,
    default: false,
  },
}, { timestamps: true });

const ReviewModel = mongoose.model('Reviews', ReviewSchema);

module.exports = ReviewModel;
