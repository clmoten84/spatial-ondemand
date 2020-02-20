-- Projects table definition
create table projects
(
  id serial not null primary key,
  title varchar(100),
  description varchar(255),
  date_created timestamp without time zone not null default current_date,
  last_modified timestamp without time zone not null default current_date,
  filter_acquisition_range_from date,
  filter_acquisition_range_to date,
  filter_resolution_from smallint,
  filter_resolution_to smallint,
  filter_incidence_angle_from smallint,
  filter_incidence_angle_to smallint,
  filter_cloud_cover_from smallint,
  filter_cloud_cover_to smallint,
  filter_snow_cover_from smallint,
  filter_snow_cover_to smallint
);

-- Project-Product relation table definition
create table project_product
(
  project_id integer not null references projects(id),
  product_id integer not null references product(id)
);