const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user', 'support'],
  },
  email: {
    type: String,
    required: false,
  },
  isBanned: {
    type: Boolean,
    required: true,
    default: false,
  },
  confirmed: {
    type: Boolean,
    required: true,
    default: false,
  },
}, { timestamps: true });

const UserModel = mongoose.model('Users', UserSchema);
module.exports = UserModel;
