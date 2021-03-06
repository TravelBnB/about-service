DROP DATABASE IF EXISTS aboutdb;

CREATE DATABASE aboutdb;

\connect aboutdb;

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
  host_id INT NOT NULL,
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

-- \COPY hosts FROM 'hostsData.csv' DELIMITER ',' CSV HEADER;
-- \COPY listings FROM 'listingsData.csv' DELIMITER ',' CSV HEADER;
-- \COPY reviews FROM 'reviewsData1.csv' DELIMITER ',' CSV HEADER;
-- \COPY reviews FROM 'reviewsData2.csv' DELIMITER ',' CSV HEADER;
-- \COPY reviews FROM 'reviewsData3.csv' DELIMITER ',' CSV HEADER;
-- \COPY reviews FROM 'reviewsData4.csv' DELIMITER ',' CSV HEADER;
-- \COPY reviews FROM 'reviewsData5.csv' DELIMITER ',' CSV HEADER;
-- \COPY reviews FROM 'reviewsData6.csv' DELIMITER ',' CSV HEADER;
-- \COPY reviews FROM 'reviewsDataSkewed1.csv' DELIMITER ',' CSV HEADER;
-- \COPY reviews FROM 'reviewsDataSkewed2.csv' DELIMITER ',' CSV HEADER;
-- \COPY reviews FROM 'reviewsDataSkewed3.csv' DELIMITER ',' CSV HEADER;
-- \COPY reviews FROM 'reviewsDataSkewed4.csv' DELIMITER ',' CSV HEADER;

ALTER TABLE listings ADD FOREIGN KEY (host_id) REFERENCES hosts (id);
ALTER TABLE reviews ADD FOREIGN KEY (user_id) REFERENCES hosts (id);
ALTER TABLE reviews ADD FOREIGN KEY (list_id) REFERENCES listings (id) ON DELETE CASCADE;
