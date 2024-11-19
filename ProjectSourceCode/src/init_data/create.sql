DROP TABLE IF EXISTS users;
CREATE TABLE users (
    username VARCHAR(50) PRIMARY KEY,
    email VARCHAR(60) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL
);

drop table if exists words;
create table Words(
word varchar(5000),
word_def varchar(5000)
);