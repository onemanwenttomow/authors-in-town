DROP TABLE IF EXISTS authorlonglist;

CREATE TABLE authorlonglist (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
