const connection = require('./connection.js');

const selectHostInfo = (id, callback) => {
  const theQuery = `select * from hosts where id = ${id}`;
  connection.query(theQuery, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

const reviewsForHost = (id, callback) => {
  const theQuery = `select * from reviews where user_id = ${id}`;
  connection.query(theQuery, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result.length);
    }
  });
};

const neighborhoodInfo = (id, callback) => {
  const theQuery = `select * from listings where id = ${id}`;
  connection.query(theQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, result);
    }
  });
};

const listingReviews = (id, callback) => {
  const query = `select rating from reviews where list_id = ${id}`;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, result);
    }
  });
};

const hostListings = (id, callback) => {
  const query = `select name from listings where host_id = ${id}`;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, result);
    }
  });
};

const reviewHostListingInfo = (id, callback) => {
  const query = `select hosts.email, hosts.first_name, hosts.last_name, listings.name, listings.features, listings.things_to_do FROM hosts INNER JOIN reviews on hosts.id = reviews.user_id INNER JOIN listings on listings.id = reviews.list_id WHERE reviews.id = ${id};`;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, result);
    }
  });
};

const addListing = (name, features, thingsToDo, latitude, longitude, callback) => {
  const query = 'insert into listings (name, host_id, features, things_to_do, lat_location, lon_location) values (?, ?, ?, ?, ?);';
  connection.query(query, [name, features, thingsToDo, latitude, longitude], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, result);
    }
  });
};

const updateListing = (id, name, hostId, features, thingsToDo, latitude, longitude, callback) => {
  const query = `update listings set name = ${name}, host_id = ${hostId}, features = ${features}, things_to_do = ${thingsToDo}, lat_location = ${latitude}, lon_location = ${longitude} where id = ${id};`;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, result);
    }
  });
};

const deleteListing = (id, callback) => {
  const query = `delete from listings where id = ${id};`;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, result);
    }
  });
};

module.exports = {
  selectHostInfo,
  reviewsForHost,
  neighborhoodInfo,
  listingReviews,
  hostListings,
  reviewHostListingInfo,
  addListing,
  updateListing,
  deleteListing,
};

// selectHostInfo();
// reviewsForHost((err, result) => {
//   console.log(result.length);
// });

// neighborhoodInfo(56, (err, result)=> {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });
