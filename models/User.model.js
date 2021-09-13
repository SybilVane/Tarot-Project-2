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
  
  country: {
    type: String,
  },
  
  avatar: {
    type: String,
  },

  age: {
    type: Number,
    min: 16
  },
  role: {
    type: String,
    enum: ['GUEST', 'USER', 'ADMIN'],
    default: 'GUEST'
  },
},{  timestamps: true
});

const User = model("User", userSchema);

module.exports = User;
