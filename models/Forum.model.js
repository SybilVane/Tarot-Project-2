const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const forumSchema = new Schema({
  
  
  user_id:{
    type: Schema.Types.ObjectId,        
    ref: 'User' 
  },
  message:{
    type: String,
    min: 10,
    max:150
  },
  date:{
    type: Date,
    default: Date.now
  },
 },{  timestamps: true
});

const Forum = model("Forum", forumSchema);

module.exports = Forum;
