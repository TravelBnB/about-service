CREATE TABLE IF NOT EXISTS hosts_by_id (
  id int,
  first_name varchar,
  last_name varchar,
  city varchar,
  state varchar,
  country varchar,
  joined_in_date DATE,
  references_count int,
  verified boolean,
  description varchar,
  response_rate FLOAT,
  response_time int,
  languages varchar,
  email varchar,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS reviews_by_host_id (
  id int,
  user_id int,
  list_id int,
  rating int,
  PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS reviews_by_list_id (
  id int,
  user_id int,
  list_id int,
  rating int,
  PRIMARY KEY (list_id)
);

CREATE TABLE IF NOT EXISTS listings_by_id (
  id int,
  name varchar,
  host_id int,
  features varchar,
  things_to_do varchar,
  lat_location float,
  lon_location float,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS listings_by_host_id (
  id int,
  name varchar,
  host_id int,
  features varchar,
  things_to_do varchar,
  lat_location float,
  lon_location float,
  PRIMARY KEY (host_id)
);

COPY hosts_by_id (id, first_name, last_name, city, state, country, joined_in_date, references_count, verified, description, response_rate, response_time, languages, email) FROM 'hostsData.csv' WITH HEADER = TRUE;

COPY reviews_by_host_id (id, user_id, list_id, rating) FROM 'reviewsData1.csv' WITH HEADER = TRUE;
COPY reviews_by_host_id (id, user_id, list_id, rating) FROM 'reviewsData2.csv' WITH HEADER = TRUE;
COPY reviews_by_host_id (id, user_id, list_id, rating) FROM 'reviewsData3.csv' WITH HEADER = TRUE;
COPY reviews_by_host_id (id, user_id, list_id, rating) FROM 'reviewsData4.csv' WITH HEADER = TRUE;
COPY reviews_by_host_id (id, user_id, list_id, rating) FROM 'reviewsData5.csv' WITH HEADER = TRUE;
COPY reviews_by_host_id (id, user_id, list_id, rating) FROM 'reviewsData6.csv' WITH HEADER = TRUE;

COPY reviews_by_list_id (id, user_id, list_id, rating) FROM 'reviewsData1.csv' WITH HEADER = TRUE;
COPY reviews_by_list_id (id, user_id, list_id, rating) FROM 'reviewsData2.csv' WITH HEADER = TRUE;
COPY reviews_by_list_id (id, user_id, list_id, rating) FROM 'reviewsData3.csv' WITH HEADER = TRUE;
COPY reviews_by_list_id (id, user_id, list_id, rating) FROM 'reviewsData4.csv' WITH HEADER = TRUE;
COPY reviews_by_list_id (id, user_id, list_id, rating) FROM 'reviewsData5.csv' WITH HEADER = TRUE;
COPY reviews_by_list_id (id, user_id, list_id, rating) FROM 'reviewsData6.csv' WITH HEADER = TRUE;

COPY listings_by_id (id, name, host_id, features, things_to_do, lat_location, lon_location) FROM 'listingsData.csv' WITH HEADER = TRUE;
COPY listings_by_host_id (id, name, host_id, features, things_to_do, lat_location, lon_location) FROM 'listingsData.csv' WITH HEADER = TRUE;

