/*
 * Product group table generation script
 * Use this script to generate the 'product_group' database table in postgres
 */
CREATE TABLE product_group
(
  id         SERIAL      NOT NULL
    CONSTRAINT product_group_pkey
    PRIMARY KEY,
  group_name VARCHAR(50) NOT NULL
);
CREATE UNIQUE INDEX product_group_group_name_uindex
  ON product_group (group_name);
COMMENT ON TABLE product_group IS 'Contains product groupings under which products reside';