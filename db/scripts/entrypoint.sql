CREATE database IF NOT EXISTS nodedb;
USE nodedb;
CREATE TABLE IF NOT EXISTS people (
    id int NOT NULL auto_increment,
    name varchar(255),
    PRIMARY KEY (id)
);
