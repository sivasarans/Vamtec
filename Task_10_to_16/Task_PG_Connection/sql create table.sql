-- 1. Create the 'country' table
CREATE TABLE country (
    id SERIAL PRIMARY KEY,
    country_code VARCHAR(10) UNIQUE NOT NULL,
    country_name VARCHAR(100) UNIQUE NOT NULL
);

-- 2. Create the 'state' table
CREATE TABLE state (
    id SERIAL PRIMARY KEY,
    country_name VARCHAR(100) NOT NULL,
    state_name VARCHAR(100) UNIQUE NOT NULL,
    FOREIGN KEY (country_name) REFERENCES country (country_name)
);

-- 3. Create the 'register' table with country_name instead of country_code
CREATE TABLE register (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    organization VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    num_users INT,
    mobile VARCHAR(15) UNIQUE,
    country_name VARCHAR(100),
    state_name VARCHAR(100),
    expiry_date DATE,
    photo BYTEA, -- Use BYTEA for storing binary data like photos
    FOREIGN KEY (country_name) REFERENCES country (country_name),
    FOREIGN KEY (state_name) REFERENCES state (state_name));
