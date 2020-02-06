const mongoose = require("mongoose"); // import mongoose dependencie

const Schema = mongoose.Schema;

const tagSchema = new Schema({
  tag: [{
      type: String,
      enum: ['loose', 'sporty', 'smart', 'urban']
  }]
});

const tagModel = mongoose.model("tag", tagSchema);

module.exports = tagModel;