--Command for creating users table
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(28) NOT NULL UNIQUE,
    passhash VARCHAR NOT NULL,
    userid VARCHAR NOT NULL UNIQUE
)

INSERT INTO users(username, passhash, id) val

