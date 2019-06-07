const express = require('express'); //import express
const router = express.Router();
const Highlight = require('../model/highlight')

// get a list of highlights from the db
router.get('/highlights', function(req, res, next) {
// 1st parameter = longitude & 2nd parameter = latitude
  Highlight.aggregate().near({
    near: {
      type:'Point',
      coordinates: [parseFloat(req.query.longitude), parseFloat(req.query.latitude)]
      //[parseFloat(req.query.lgt1), parseFloat(req.query.lat1), parseFloat(req.query.lgt2), parseFloat(req.query.lat2)]
    },
    maxDistance: 100000,
    spherical: true,
    distanceField: "dis"
  }).then(function(highlights) {
       res.send(highlights);
     }).catch(next);
});

// create a new highlight
router.post('/highlights', function(req, res, next) {
  Highlight.create(req.body).then(function(highlight) {
    res.send(highlight);
  }).catch(next);
});

// // update a highlight
router.put('/highlights/:id', function(req, res, next) {
  Highlight.findByIdAndUpdate({_id: req.params.id}, req.body).then(function() {
    Highlight.findOne({_id: req.params.id}).then(function(highlight) {
      res.send(highlight);
    }).catch(next);
  });
});

// // delete a highlight from the db
router.delete('/highlights/:id', function(req, res, next) {
  Highlight.findByIdAndRemove({_id: req.params.id}).then(function(highlight) {
    res.send(highlight);
  }).catch(next);
});

module.exports = router;
