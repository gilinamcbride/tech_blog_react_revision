const { Schema, model } = require('mongoose');
const Blog = require('./Blog');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
    },
    first_name: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      unique: false,
    },
    last_name: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      unique: false,
    },
    blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const User = model('User', UserSchema);

module.exports = User;
