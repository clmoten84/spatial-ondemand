/*
 * UserAcct table creation script
 * Use this script to generate the "user_accts" table in postgres
 */

create table user_accts
(
  id uuid not null primary key,
  username varchar(50) not null,
  password varchar(255) not null,
  email varchar(50),
  date_created timestamp without time zone not null default current_date,
  last_modified timestamp without time zone not null default current_date
)