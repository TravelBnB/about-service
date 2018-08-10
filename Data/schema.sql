CREATE TABLE IF NOT EXISTS hosts (
  id SERIAL,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  city varchar(255)  NOT NULL,
  state varchar(255)  NOT NULL,
  country varchar(255)  NOT NULL,
  joined_in_date DATE NOT NULL,
  references_count int DEFAULT 0,
  verified boolean,
  description varchar(1000) NOT NULL,
  response_rate FLOAT,
  response_time int,
  languages varchar(255),
  email varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS listings (
  id SERIAL,
  name varchar(100),
  features varchar(500),
  things_to_do varchar(500),
  lat_location float,
  lon_location float,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL,
  user_id INT NOT NULL,
  list_id INT NOT NULL,
  rating INT NOT NULL,
  PRIMARY KEY (id)
);