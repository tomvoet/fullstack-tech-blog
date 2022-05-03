--PostgreSQL

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    last_login TIMESTAMP,
    intro TEXT
);

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    cleaned_title VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    views INTEGER NOT NULL DEFAULT 0,
	author_id INT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS tags (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS posts_tags (
	posts_id INT NOT NULL,
	tags_id INT NOT NULL,
    FOREIGN KEY (posts_id) REFERENCES posts(id),
    FOREIGN KEY (tags_id) REFERENCES tags(id)
);

CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
	author_id INT NOT NULL,
	post_id INT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id),
    created_at TIMESTAMP NOT NULL,
    content TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users(