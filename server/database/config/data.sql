BEGIN ;

DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id SERIAL PRIMARY KEY ,
    first_name VARCHAR(255) NOT NULL ,
    last_name VARCHAR(255) NOT NULL ,
    email VARCHAR(255) NOT NULL ,
    password VARCHAR(255) NOT NULL ,
    phone_number VARCHAR(255) NOT NULL ,
    birthday VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL ,
    address VARCHAR(255) NOT NULL ,
    role VARCHAR(255) NOT NULL 
);

COMMIT ;