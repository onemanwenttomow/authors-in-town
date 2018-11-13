DROP TABLE IF EXISTS thelistevents;

CREATE TABLE thelistevents (
    id SERIAL PRIMARY KEY,
    user_id INT DEFAULT 1,
    name VARCHAR(300) NOT NULL,
    goodreads_id VARCHAR(100),
    event_name VARCHAR(300) NOT NULL,
    venue_name VARCHAR(200) NOT NULL,
    town VARCHAR(255) NOT NULL,
    country VARCHAR(200) NOT NULL,
    event_time VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
