const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const historySchema = new Schema({
  
  cards_id: [{
    type: Schema.Types.ObjectId,        
    ref: 'Card' 
  }],
  user_id:{
    type: Schema.Types.ObjectId,        
    ref: 'User' 
  },
  date:{
    type: Date,
    default: Date.now
  },
 },{  timestamps: true
});

const History = model("History", historySchema);

module.exports = History;
