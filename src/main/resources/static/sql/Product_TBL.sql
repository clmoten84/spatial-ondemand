/*
 * Product table creation script
 * Use this script to generate the 'product' database table in postgres
 */
create table product
(
  id serial not null
    constraint product_pkey
    primary key,
  group_id integer not null
    constraint product__productgroup_fk
    references product_group
    on update cascade on delete cascade,
  product_name varchar(100) not null,
  service_url varchar(500) not null
)
;

create unique index product_product_name_uindex
  on product (product_name)
;

comment on table product is 'Contains exportable/downloadable product data'
;