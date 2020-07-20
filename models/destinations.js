
// Defined Schema necessary for use with MongoDB //
const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    id:           Number,
    title:        String,
    description:  String,
    link:         String,
    intro:        String,
    fact1:        String,
    fact2:        String,
    fact3:        String,
    fact4:        String,
    fact5:        String,
    fact6:        String
  }
);

// Compile and export this model using the above Schema //
// Mongoose automatically looks for the plural, lower-cased version of the model name. //
module.exports = mongoose.model('Destinations', gallerySchema);

