-- Adding a few sample product records and a sample product group to use during Project integration tests
insert into product_group (id, group_name) values (47, 'Test Group');
insert into product (group_id, product_name, service_url) values (47, 'Test Product', 'https://bullshit.com/1');
insert into product (group_id, product_name, service_url) values (47, 'Another Test Product', 'https://bullshit.com/2');

-- Adding a sample project record and associating to a product
insert into projects (id, title, description, filter_acquisition_range_from, filter_acquisition_range_to,
  filter_resolution_from, filter_resolution_to, filter_incidence_angle_from, filter_incidence_angle_to,
  filter_cloud_cover_from, filter_cloud_cover_to, filter_snow_cover_from, filter_snow_cover_to)
    values (1, 'Imagery Project', 'Project to use during integration testsing.',
    '2001-05-01', '2015-12-25', 25, 1000, 45, 85, 0, 100, 0, 100);

insert into projects (id, title, description, filter_acquisition_range_from, filter_acquisition_range_to,
                      filter_resolution_from, filter_resolution_to, filter_incidence_angle_from, filter_incidence_angle_to,
                      filter_cloud_cover_from, filter_cloud_cover_to, filter_snow_cover_from, filter_snow_cover_to)
values (2, 'Another Imagery Project', 'Integration testing sucks but is a little better with Test Containers.',
           '2007-08-16', '2012-03-25', 25, 1000, 45, 85, 0, 100, 0, 100);

insert into project_product(project_id, product_id) VALUES (1, 400);
insert into project_product(project_id, product_id) VALUES (2, 400);
insert into project_product(project_id, product_id) VALUES (2, 401);
