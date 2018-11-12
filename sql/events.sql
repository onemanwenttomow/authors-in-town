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
