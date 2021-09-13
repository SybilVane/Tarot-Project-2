const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  
  username: {
    type: String,
    unique: true,
    require: true
  },
  password:{
    type:String,
    require: true
  },
  firstName:{
    type:String,
    require: true
  },
  lastName:{
    type:String,
    require: true
  },
  email:{
    type:String,
    require: true
  },
  adress:{
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    }
  },
  age: {
    type: Number,
    min: 16
  },
},{  timestamps: true
});

const User = model("User", userSchema);

module.exports = User;
