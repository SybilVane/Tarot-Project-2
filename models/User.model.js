const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },

    country: {
      type: String,
    },

    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/dqwvgka1a/image/upload/v1631716200/uie5sdrtz0jzva0gwiuh.png',
    },

    age: {
      type: Number,
      min: 16,
    },
    role: {
      type: String,
      enum: ['GUEST', 'USER', 'ADMIN'],
      default: 'USER',
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

module.exports = User;
