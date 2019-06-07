const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create geo-location HighlightSchema
const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
});

//create highlight Schema & model
const HighlightSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
  },
  city: {
    type: String,
    required: [true, 'City field is required']
  },
  description: {
    type: String,
    required: [true, 'Description field is required']
  },
  tips: {
    type: String
  },
  geometry: GeoSchema
});

const Highlight = mongoose.model('highlight', HighlightSchema);
module.exports = Highlight;
