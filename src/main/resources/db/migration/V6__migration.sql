-- Create roles table and role name index
create table roles
(
  id uuid not null primary key,
  role_name varchar(50) not null unique,
  date_created timestamp without time zone not null default current_date,
  last_modified timestamp without time zone not null default current_date
);
create index role_name_idx on roles (role_name);

-- Create user_roles table for managing user -> roles relationship
create table user_roles
(
  user_id uuid not null references user_accts(id),
  role_id uuid not null references roles(id),
  primary key (user_id, role_id)
);