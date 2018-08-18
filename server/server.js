const redis = require('redis');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// need to create a file to select data
const db = require('../db/queries.js');

const client = redis.createClient();

client.on('connect', () => {
  console.log('Redis client connected');
});

const app = express();

// to parse our data and use req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/about/hosts/:id', (req, res) => {
  const id = req.params.id;
  const hostsKey = `${id}:host`;

  client.hgetall(hostsKey, (hgetallErr, host) => {
    if (host) {
      return res.json(host);
    }
    db.selectHostInfo(id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        client.hmset(hostsKey, result.rows[0], (hmSetError) => {
          if (hmSetError) {
            console.log(hmSetError);
          }
        });
        res.json(result.rows[0]);
      }
    });
  });
});

app.get('/api/about/reviews/:hostId', (req, res) => {
  const id = req.params.hostId;
  const reviewsKey = `${id}:reviews`;

  client.get(reviewsKey, (hgetallErr, reviews) => {
    if (reviews) {
      return res.json(reviews);
    }
    db.reviewsForHost(id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        client.set(reviewsKey, result.rowCount, (hmSetError) => {
          if (hmSetError) {
            console.log(hmSetError);
          }
        });
        res.send(JSON.stringify(result.rowCount));
      }
    });
  });
});

app.get('/api/about/neighborhood/:listingId', (req, res) => {
  const id = req.params.listingId;
  const listingsKey = `${id}:listing`;

  client.hgetall(listingsKey, (hgetallErr, listing) => {
    if (listing) {
      return res.json(listing);
    }
    db.neighborhoodInfo(id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        client.hmset(listingsKey, result.rows[0], (hmSetError) => {
          if (hmSetError) {
            console.log(hmSetError);
          }
        });
        res.json(result.rows[0]);
      }
    });
  });
});

app.get('/api/about/reviews/:listingId', (req, res) => {
  db.listingReviews(req.params.listingId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify(result.rows));
    }
  });
});

app.get('/api/about/listings/:hostId', (req, res) => {
  db.hostListings(req.params.hostId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify(result.rows));
    }
  });
});

app.get('/api/about/hosts/listings/:reviewId', (req, res) => {
  db.reviewHostListingInfo(req.params.reviewId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify(result.rows));
    }
  });
});

app.post('/api/about/listings', (req, res) => {
  db.addListing(req.body.name, req.body.hostId, req.body.features, req.body.thingsToDo, req.body.latitude, req.body.longitude, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(201);
    }
  });
});

app.put('/api/about/listings/:listingId', (req, res) => {
  db.updateListing(req.params.id, req.body.hostId, req.body.name, req.body.features, req.body.thingsToDo, req.body.latitude, req.body.longitude, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete('/api/about/listings/:listingId', (req, res) => {
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
