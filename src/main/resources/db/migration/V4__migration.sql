-- Create user_accts table
create table user_accts
(
  id uuid not null primary key,
  username varchar(50) not null,
  password varchar(255) not null,
  email varchar(50) not null,
  name varchar(50),
  biz_entity varchar(50),
  is_admin BOOLEAN not null default FALSE,
  date_created timestamp without time zone not null default current_date,
  last_modified timestamp without time zone not null default current_date
)