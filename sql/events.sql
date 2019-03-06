DROP TABLE IF EXISTS events;

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(200) NOT NULL,
    goodreads_id VARCHAR(100) NOT NULL,
    event_name VARCHAR(200) NOT NULL,
    venue_name VARCHAR(200) NOT NULL,
    town VARCHAR(255) NOT NULL,
    country VARCHAR(200) NOT NULL,
    event_time VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    2,
    'Jaspar FForde',
    '4432',
    'Super awesome test event title',
    'Waterstones Berlin',
    'Berlin',
    'Germany',
    '2019-04-17T21:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    2,
    'Jaspar FForde',
    '4432',
    'Super amazing test event title',
    'Waterstones Munich',
    'Munich',
    'Germany',
    '2019-04-18T21:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    2,
    'Jaspar FForde',
    '4432',
    'Super special test event title',
    'Waterstones Oxford',
    'Oxford',
    'UK',
    '2019-04-19T21:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    1,
    'Tom Holt',
    '9766',
    'Super special test event title',
    'A Lovely Bookshop Berlin',
    'Berlin',
    'Germany',
    '2019-04-22T19:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    1,
    'Tom Holt',
    '9766',
    'Super special test event title',
    'Bookshop Leipzig',
    'Leipzig',
    'Germany',
    '2019-04-23T19:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    1,
    'Robin Hobb',
    '25307',
    'Super special test event title',
    'Bookshop Berlin',
    'Berlin',
    'Germany',
    '2019-04-25T19:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    1,
    'Robin Hobb',
    '25307',
    'Super special test event title',
    'Bookshop Leipzig',
    'Leipzig',
    'Germany',
    '2019-04-26T19:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    1,
    'Neil Gaiman',
    '1221698',
    'Super special test event title',
    'Bookshop Berlin',
    'Berlin',
    'Germany',
    '2019-04-28T19:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    1,
    'Robin Hobb',
    '1221698',
    'Super special event with Neil Gaiman',
    'Bookshop Leipzig',
    'Leipzig',
    'Germany',
    '2019-04-29T19:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    1,
    'Peter F. Hamilton',
    '25375',
    'Super special test event title',
    'Bookshop Berlin',
    'Berlin',
    'Germany',
    '2019-04-29T19:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    1,
    'Peter F. Hamilton',
    '25375',
    'Super special event with Peter F. Hamilton',
    'Bookshop Leipzig',
    'Leipzig',
    'Germany',
    '2019-04-30T19:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    1,
    'N.K. Jemisin',
    '2917917',
    'Super special test event title',
    'Bookshop Berlin',
    'Berlin',
    'Germany',
    '2019-04-01T19:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    1,
    'N.K. Jemisin',
    '2917917',
    'Super special event with Peter F. Hamilton',
    'Bookshop Leipzig',
    'Leipzig',
    'Germany',
    '2018-04-02T19:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    1,
    'Catherynne M. Valente',
    '338705',
    'Super special test event title',
    'Bookshop Berlin',
    'Berlin',
    'Germany',
    '2018-04-01T19:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    1,
    'Catherynne M. Valente',
    '338705',
    'Super special event with Peter F. Hamilton',
    'Bookshop Leipzig',
    'Leipzig',
    'Germany',
    '2019-04-02T19:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    2,
    'Jaspar FForde',
    '4432',
    'Cardiff Library Talk',
    'Rhydypennau Library,',
    'Cardiff',
    'UK',
    '2019-04-16T19:00'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    2,
    'Jaspar FForde',
    '4432',
    'Washington, DC: Politics & Prose Bookstore',
    'Politics & Prose Bookstore',
    'Washington',
    'USA',
    '2019-04-18T19:00'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    2,
    'Jaspar FForde',
    '4432',
    'Raleigh, NC: Quail Ridge Books',
    'Quail Ridge Books',
    'Raleigh',
    'USA',
    '2019-04-19T19:00'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    2,
    'Jaspar FForde',
    '4432',
    'St. Louis, MO: Ethical Society of St. Louis',
    'Ethical Society of St. Louis',
    'St. Louis',
    'USA',
    '2019-04-20T19:00'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    2,
    'Jaspar FForde',
    '4432',
    'Houston, TX: Murder by the Book',
    'Murder by the Book',
    'Houston',
    'USA',
    '2019-04-21T18:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    2,
    'Jaspar FForde',
    '4432',
    'Austin, TX: BookPeople',
    'BookPeople',
    'Austin',
    'USA',
    '2019-02-22T19:00'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    2,
    'Jaspar FForde',
    '4432',
    'Seattle, WA: Third Place Books',
    'Third Place Books',
    'Seattle',
    'USA',
    '2019-02-24T18:00'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    2,
    'Jaspar FForde',
    '4432',
    'San Francisco, CA: Rakestraw Books',
    'Rakestraw Books',
    'San Francisco',
    'USA',
    '2019-02-25T19:00'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    2,
    'Jaspar FForde',
    '4432',
    'Fforde Ffiesta VIII',
    'Village Hotel',
    'Swindon',
    'UK',
    '2019-03-25T11:00'
);
