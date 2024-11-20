DROP TABLE IF EXISTS users;
CREATE TABLE users (
    username VARCHAR(50) PRIMARY KEY,
    password CHAR(60) NOT NULL,
    easy_score SMALLINT,
    medium_score SMALLINT,
    hard_score SMALLINT
);