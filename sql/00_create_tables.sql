CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    user_uid UUID NOT NULL UNIQUE,
    name TEXT NOT NULL,
    PRIMARY KEY (user_uid)
);

CREATE TABLE posts (
    post_uid UUID NOT NULL UNIQUE,
    user_uid UUID NOT NULL,
    title TEXT NOT NULL DEFAULT 'Untitled',
    body TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (post_uid),
    CONSTRAINT author FOREIGN KEY (user_uid) REFERENCES users(user_uid)
);
