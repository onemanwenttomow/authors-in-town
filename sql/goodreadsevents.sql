DROP TABLE IF EXISTS goodreadsevents;

CREATE TABLE goodreadsevents (
    id SERIAL PRIMARY KEY,
    user_id INT DEFAULT 1,
    name VARCHAR(300) ,
    goodreads_id VARCHAR(100),
    event_name VARCHAR(300) NOT NULL,
    venue_name VARCHAR(200) NOT NULL,
    town VARCHAR(255) NOT NULL,
    country VARCHAR(200) NOT NULL,
    event_time VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO goodreadsevents (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    4,
    'Jaspar FForde',
    '4432',
    'Super awesome test event title',
    'Waterstones Berlin',
    'Berlin',
    'Germany',
    '2018-11-17T21:30'
);

INSERT INTO goodreadsevents (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    4,
    'Jaspar FForde',
    '4432',
    'Super amazing test event title',
    'Waterstones Munich',
    'Munich',
    'Germany',
    '2018-11-18T21:30'
);

INSERT INTO goodreadsevents (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    4,
    'Jaspar FForde',
    '4432',
    'Super special test event title',
    'Waterstones Oxford',
    'Oxford',
    'The United Kingdom',
    '2018-11-19T21:30'
);

INSERT INTO goodreadsevents (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    5,
    'Tom Holt',
    '9766',
    'Super special test event title',
    'A Lovely Bookshop Berlin',
    'Berlin',
    'Germany',
    '2018-11-22T19:30'
);

INSERT INTO goodreadsevents (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    5,
    'Tom Holt',
    '9766',
    'Super special test event title',
    'Bookshop Leipzig',
    'Leipzig',
    'Germany',
    '2018-11-23T19:30'
);

INSERT INTO goodreadsevents (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    5,
    'Robin Hobb',
    '25307',
    'Super special test event title',
    'Bookshop Berlin',
    'Berlin',
    'Germany',
    '2018-11-25T19:30'
);

INSERT INTO goodreadsevents (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    5,
    'Robin Hobb',
    '25307',
    'Super special test event title',
    'Bookshop Leipzig',
    'Leipzig',
    'Germany',
    '2018-11-26T19:30'
);

INSERT INTO goodreadsevents (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    5,
    'Neil Gaiman',
    '1221698',
    'Super special test event title',
    'Bookshop Berlin',
    'Berlin',
    'Germany',
    '2018-11-28T19:30'
);

INSERT INTO goodreadsevents (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    5,
    'Robin Hobb',
    '1221698',
    'Super special event with Neil Gaiman',
    'Bookshop Leipzig',
    'Leipzig',
    'Germany',
    '2018-11-29T19:30'
);

INSERT INTO goodreadsevents (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    5,
    'Peter F. Hamilton',
    '25375',
    'Super special test event title',
    'Bookshop Berlin',
    'Berlin',
    'Germany',
    '2018-11-29T19:30'
);

INSERT INTO goodreadsevents (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    5,
    'Peter F. Hamilton',
    '25375',
    'Super special event with Peter F. Hamilton',
    'Bookshop Leipzig',
    'Leipzig',
    'Germany',
    '2018-11-30T19:30'
);

INSERT INTO goodreadsevents (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    5,
    'N.K. Jemisin',
    '2917917',
    'Super special test event title',
    'Bookshop Berlin',
    'Berlin',
    'Germany',
    '2018-12-01T19:30'
);

INSERT INTO goodreadsevents (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    5,
    'N.K. Jemisin',
    '2917917',
    'Super special event with Peter F. Hamilton',
    'Bookshop Leipzig',
    'Leipzig',
    'Germany',
    '2018-12-02T19:30'
);

INSERT INTO goodreadsevents (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    5,
    'Catherynne M. Valente',
    '338705',
    'Super special test event title',
    'Bookshop Berlin',
    'Berlin',
    'Germany',
    '2018-12-01T19:30'
);

INSERT INTO goodreadsevents (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    5,
    'Catherynne M. Valente',
    '338705',
    'Super special event with Peter F. Hamilton',
    'Bookshop Leipzig',
    'Leipzig',
    'Germany',
    '2018-12-02T19:30'
);

INSERT INTO goodreadsevents (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    4,
    'Jaspar FForde',
    '4432',
    'Cardiff Library Talk',
    'Rhydypennau Library,',
    'Cardiff',
    'The United Kingdom',
    '2019-01-16T19:00'
);

INSERT INTO goodreadsevents (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    4,
    'Jaspar FForde',
    '4432',
    'Washington, DC: Politics & Prose Bookstore',
    'Politics & Prose Bookstore',
    'Washington',
    'USA',
    '2019-02-18T19:00'
);

INSERT INTO goodreadsevents (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    4,
    'Jaspar FForde',
    '4432',
    'Raleigh, NC: Quail Ridge Books',
    'Quail Ridge Books',
    'Raleigh',
    'USA',
    '2019-02-19T19:00'
);

INSERT INTO goodreadsevents (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    4,
    'Jaspar FForde',
    '4432',
    'St. Louis, MO: Ethical Society of St. Louis',
    'Ethical Society of St. Louis',
    'St. Louis',
    'USA',
    '2019-02-20T19:00'
);

INSERT INTO goodreadsevents (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    4,
    'Jaspar FForde',
    '4432',
    'Houston, TX: Murder by the Book',
    'Murder by the Book',
    'Houston',
    'USA',
    '2019-02-21T18:30'
);

INSERT INTO goodreadsevents (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    4,
    'Jaspar FForde',
    '4432',
    'Austin, TX: BookPeople',
    'BookPeople',
    'Austin',
    'USA',
    '2019-02-22T19:00'
);

INSERT INTO goodreadsevents (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    4,
    'Jaspar FForde',
    '4432',
    'Seattle, WA: Third Place Books',
    'Third Place Books',
    'Seattle',
    'USA',
    '2019-02-24T18:00'
);

INSERT INTO goodreadsevents (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    4,
    'Jaspar FForde',
    '4432',
    'San Francisco, CA: Rakestraw Books',
    'Rakestraw Books',
    'San Francisco',
    'USA',
    '2019-02-25T19:00'
);

INSERT INTO goodreadsevents (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    4,
    'Jaspar FForde',
    '4432',
    'Fforde Ffiesta VIII',
    'Village Hotel',
    'Swindon',
    'The United Kingdom',
    '2019-03-25T11:00'
);
