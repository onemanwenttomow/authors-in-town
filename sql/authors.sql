DROP TABLE IF EXISTS authors;

CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    user_id INT,
    author_pic_url VARCHAR(300),
    popularity_ranking VARCHAR(200) NOT NULL,
    goodreads_id VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
