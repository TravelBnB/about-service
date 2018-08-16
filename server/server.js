const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// need to create a file to select data
const db = require('../db/queries.js');

const app = express();

// to parse our data and use req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/hosts/:id', (req, res) => {
  console.log(req.params);
  db.selectHostInfo(+req.params.id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

app.get('/reviews/:hostId', (req, res) => {
  console.log(req.params);
  db.reviewsForHost(+req.params.hostId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

app.get('/listings/:listingId', (req, res) => {
  console.log(req.params);
  db.neighborhoodInfo(+req.params.listingId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

app.get('/reviews/:listingId', (req, res) => {
  db.listingReviews(req.params.listingId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

app.get('/listings/:hostId', (req, res) => {
  db.hostListings(req.params.hostId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

app.get('/hosts/listings/:reviewId', (req, res) => {
  db.reviewHostListingInfo(req.params.reviewId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

app.post('/listings', (req, res) => {
  db.addListing(req.body.name, req.body.hostId, req.body.features, req.body.thingsToDo, req.body.latitude, req.body.longitude, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(201);
    }
  });
});

app.put('/listings/:listingId', (req, res) => {
  db.updateListing(req.params.id, req.body.hostId, req.body.name, req.body.features, req.body.thingsToDo, req.body.latitude, req.body.longitude, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete('/listings/:listingId', (req, res) => {
  db.deleteListing(req.params.id, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(3001, () => {
  console.log('Server started on 3001');
});


// const express = require('express');
// const morgan = require('morgan');
// const path = require('path');
// const app = express();
// const port = process.env.PORT || 3002;
//
// app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, '../public')));
//
// app.listen(port, () => {
//   console.log(`server running at: http://localhost:${port}`);
// });
