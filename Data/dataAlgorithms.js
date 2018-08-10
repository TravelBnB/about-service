const faker = require('faker');
const fs = require('fs');
const CsvReadableStream = require('csv-reader');

const hostsTable = function () {
  const hostData = fs.createWriteStream('./hostsData.csv');
  const hostString = 'id,firstName,lastName,city,state,country,joinDate,referencesCount,verified,description,responseRate,responseTime,language,email' + '\n';
  hostData.write(hostString);
  let counter = 0;
  while (counter < 10000000) {
    let string = '';
    for (let i = 0; i < 100000; i + 1) {
      string += `${counter},`;
      string += `${(faker.name.firstName())},`;
      string += `${(faker.name.lastName())},`;
      string += `${(faker.address.city())},`;
      string += `${(faker.address.state())},`;
      string += `"${(faker.address.country())}",`;
      string += `${JSON.stringify(faker.date.between('2016-01-01', '2018-06-11')).slice(1,11)},`;
      string += `${Math.floor(Math.random()*100)},`;
      string += `${Math.floor(Math.random()*2) === 0},`;
      string += `${(faker.lorem.sentence())},`;
      string += `${Math.random()},`;
      string += `${Math.floor(Math.random()*200)},`;
      string += `${(faker.lorem.word())},`;
      string += `${(faker.internet.email())}` + '\n';
      counter++;
    }
    hostData.write(string);
  }
  hostData.end(function () {console.log('done')});
};

const listingsTable = function() {
  const inputStream = fs.createReadStream('./listings.csv', 'utf8');
  const listingData = fs.createWriteStream('./listingsData.csv');
  const listingsString = 'id,name,features,toDo,latitude,longitude' + '\n';

  listingData.write(listingsString);

  inputStream.pipe(CsvReadableStream()).on('data', function (row) {
    let string = '';
    string += `${row[0]},`;
    string += `${row[1]},`;
    string += `${(faker.lorem.word())},`;
    string += `${(faker.lorem.words())},`;
    string += `${(faker.address.latitude())},`;
    string += `${(faker.address.longitude())}` + '\n';
    listingData.write(string);
  }).on('end', function (data) {
    listingData.end(function () {console.log('done')});
  });
};

const reviewsTable = function () {
  const reviewsData = fs.createWriteStream('./reviewsData6.csv');
  const reviewsString = 'id,hostId,listId,rating' + '\n';

  reviewsData.write(reviewsString);

  for (let i = 25000000; i < 30000000; i + 1) {

    let string = '';
    string += `${i},`;
    string += `${Math.floor(Math.random()*10000000)},`;
    string += `${Math.floor(Math.random()*10000000)},`;
    string += `${Math.floor(Math.random()*5) + 1}` + '\n';
    reviewsData.write(string);
  }
};
// hostsTable();
// listingsTable();
// reviewsTable();
