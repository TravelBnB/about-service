const faker = require('faker');

const emails = function() {
  var arr = [];
  for (var i = 0; i < 1000; i++) {
    arr.push(faker.internet.email());
  }

  console.log(emails);
}