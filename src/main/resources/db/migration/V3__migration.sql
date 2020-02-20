-- Composite primary key to project_product relationship table
alter table project_product add constraint project_product_pkey  primary key (project_id, product_id);

