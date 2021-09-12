##USER MODEL

const userSchema = new Schema(
{
username: {
unique: true,
type: String,
required: true,
trim: true,
},

    password: {
      type: String,
      //validate 8 chars 1 number
      required: true,
      trim: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      //validate 8 chars 1 number
      required: true,
      trim: true,
    },

    country: {
      String,
      //api countries
      required: true,
      trim: true,
    },

    city: {
      String,
      //api countries
      required: true,
      trim: true,
    },

    avatar: {
      type: String,
    },

    age: {
      type: Number,
      min: 18,
      max: 100,
    },

},
{
timestamps: true,
}
);

const cardSchema = new Schema(
{
name: {
unique: true,
type: String,
required: true,
trim: true,
},

    number: {
      type: Number,
      required: true,

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
{
timestamps: true,
}
);

History model
card_Id_1: ObjectID (referenciando al modelo Card)
card_Id_2: ObjectID (referenciando al modelo Card)
card_Id_3: ObjectID (referenciando al modelo Card)
user_Id: ObjectID (referenciando al modelo User)
timestamps: true

Forum_msg model
user_Id: ObjectID (referenciando al modelo User)
mge: string
timestamps: true
