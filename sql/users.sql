DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first VARCHAR(100) NOT NULL,
    last VARCHAR(200) NOT NULL,
    city VARCHAR(200) NOT NULL,
    country VARCHAR(200) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    imgurl VARCHAR(300),
    approvedGoodReads BOOLEAN DEFAULT false,
    author BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
