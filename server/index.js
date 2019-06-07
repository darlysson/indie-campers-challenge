const express = require('express'); //import express
const routes = require('./routes/api')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/highlightdb', { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true)

app.use(bodyParser.json());
app.use(cors());

// //initialize routes
app.use('/api', routes);

//error handling middleware
app.use(function(err, req, res, next) {
  res.status(422).send({error: err.message});
});

 //listen for requests
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Server is ready, listening on port ${port}`);
});
