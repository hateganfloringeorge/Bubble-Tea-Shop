const mongoose = require('mongoose');

const { Schema } = mongoose;

const QustionSchema = new Schema({
  userPosting: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  reply: {
    type: String,
    required: false,
  },
  faq: {
    type: Boolean,
    required: true,
    default: false,
  },
}, { timestamps: true });

const QuestionModel = mongoose.model('Questions', QustionSchema);

module.exports = QuestionModel;
