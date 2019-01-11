CREATE SCHEMA myschema;

CREATE TABLE tracks (
  id serial NOT NULL,
  artist varchar(100),
  track varchar(100),
  album varchar(100),
  albumart varchar(100),
  plays varchar(100),
  likes varchar(100),
  shares varchar(100),
  comments varchar(100)
);