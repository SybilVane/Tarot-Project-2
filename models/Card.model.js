const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const cardSchema = new Schema(
  {
    number: {
      type: Number,
      require: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    uprightImage: {
      type: String,
    },
    reverseImage: {
      type: String,
    },
    uprightKeywords: {
      type: String,
      required: true,
    },
    reverseKeywords: {
      type: String,
      required: true,
    },
    uprightFullDescription: {
      type: String,
      required: true,
    },
    reverseFullDescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Card = model('Card', cardSchema);

module.exports = Card;
