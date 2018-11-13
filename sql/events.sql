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
    4,
    'Jaspar FForde',
    '4432',
    'Super awesome test event title',
    'Waterstones Berlin',
    'Berlin',
    'Germany',
    '2018-11-17T21:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    4,
    'Jaspar FForde',
    '4432',
    'Super amazing test event title',
    'Waterstones Munich',
    'Munich',
    'Germany',
    '2018-11-18T21:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    4,
    'Jaspar FForde',
    '4432',
    'Super special test event title',
    'Waterstones Oxford',
    'Oxford',
    'UK',
    '2018-11-19T21:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    5,
    'Tom Holt',
    '9766',
    'Super special test event title',
    'A Lovely Bookshop Berlin',
    'Berlin',
    'Germany',
    '2018-11-22T19:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    5,
    'Tom Holt',
    '9766',
    'Super special test event title',
    'Bookshop Leipzig',
    'Leipzig',
    'Germany',
    '2018-11-23T19:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    5,
    'Robin Hobb',
    '25307',
    'Super special test event title',
    'Bookshop Berlin',
    'Berlin',
    'Germany',
    '2018-11-25T19:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    5,
    'Robin Hobb',
    '25307',
    'Super special test event title',
    'Bookshop Leipzig',
    'Leipzig',
    'Germany',
    '2018-11-26T19:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    5,
    'Neil Gaiman',
    '1221698',
    'Super special test event title',
    'Bookshop Berlin',
    'Berlin',
    'Germany',
    '2018-11-28T19:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    5,
    'Robin Hobb',
    '1221698',
    'Super special event with Neil Gaiman',
    'Bookshop Leipzig',
    'Leipzig',
    'Germany',
    '2018-11-29T19:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    5,
    'Peter F. Hamilton',
    '25375',
    'Super special test event title',
    'Bookshop Berlin',
    'Berlin',
    'Germany',
    '2018-11-29T19:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    5,
    'Peter F. Hamilton',
    '25375',
    'Super special event with Peter F. Hamilton',
    'Bookshop Leipzig',
    'Leipzig',
    'Germany',
    '2018-11-30T19:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    5,
    'N.K. Jemisin',
    '2917917',
    'Super special test event title',
    'Bookshop Berlin',
    'Berlin',
    'Germany',
    '2018-12-01T19:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    5,
    'N.K. Jemisin',
    '2917917',
    'Super special event with Peter F. Hamilton',
    'Bookshop Leipzig',
    'Leipzig',
    'Germany',
    '2018-12-02T19:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    5,
    'Catherynne M. Valente',
    '338705',
    'Super special test event title',
    'Bookshop Berlin',
    'Berlin',
    'Germany',
    '2018-12-01T19:30'
);

INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time) VALUES (
    5,
    'Catherynne M. Valente',
    '338705',
    'Super special event with Peter F. Hamilton',
    'Bookshop Leipzig',
    'Leipzig',
    'Germany',
    '2018-12-02T19:30'
);
