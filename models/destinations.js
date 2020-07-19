
// Step 1: Defined Schema necessary for use with MongoDB //
const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    id:           Number,
    title:        String,
    description:  String,
    link:         String,
    paragraph:    String
  }
);

// Compile and export this model using the above Schema //
// Mongoose automatically looks for the plural, lower-cased version of the model name. //
module.exports = mongoose.model('Destinations', gallerySchema);

