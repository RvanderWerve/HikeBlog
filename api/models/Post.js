const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: true,
      unique: true,
    },
    dist: {
      type: Number,
      required: false,
    },
    ascent:{
      type: Number,
      required: false
    },
    hikeDate:{
      type: Date,
      required: true
    },
    leaveFrom:{
      type:  String,
      required: false
    },
    arriveAt:{
      type: String,
      required: false
    },
    area:{
      type: String,
      required: false
    },
    latitude:{
      type: String,
      required: false
    },
    longitude:{
      type: String,
      required: false
    },
    gpxLink:{
      type: String,
      required: false
    },
    gpxFile:{
      type: String,
      required: false
    },
    story1:{
      type: String,
      required: false
    },
    story2:{
      type: String,
      required: false
    },
    headPhoto:{
      type: String,
      required: false
    },
    photo1:{
      type: String,
      required: false
    },
    photo2:{
      type: String,
      required: false
    },
    natureText:{
      type: String,
      required: false
    },
    naturePhoto:{
      type: String,
      required: false
    },
    mealText:{
      type: String,
      required: false
    },
    mealPhoto:{
      type: String,
      required: false
    },
    shopText:{
      type: String,
      required: false
    },
   
    username: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
