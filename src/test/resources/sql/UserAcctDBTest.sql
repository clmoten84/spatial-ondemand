-- Add roles
insert into roles (id, role_name) values ('4B36AFC8-5205-49C1-AF16-4DC6F96DB982'::uuid, 'ADMIN');
insert into roles (id, role_name) values ('4B36AFC8-5205-49C1-AF16-4DC6F96DB899'::uuid, 'USER');

-- Add users
insert into user_accts (id, username, password, email, name, biz_entity) VALUES
('4B36AFC8-5205-49C1-AF16-4DC6F96DB983'::uuid, 'sumdumgoy', 'P@$$word', 'sumdumgoy@gmail.com', 'Corey Jacobs', 'Disney');

insert into user_accts (id, username, password, email, name, biz_entity, is_admin) VALUES
('4B36AFC8-5205-49C1-AF16-4DC6F96DB984'::uuid, 'kbryant', 'M@mba', 'mambamental@gmail.com', 'Kobe Bryant', 'NBA', TRUE);

-- Assign role to users
insert into user_roles (user_id, role_id) VALUES ('4B36AFC8-5205-49C1-AF16-4DC6F96DB983'::uuid,
                                                  '4B36AFC8-5205-49C1-AF16-4DC6F96DB899'::uuid);

insert into user_roles (user_id, role_id) VALUES ('4B36AFC8-5205-49C1-AF16-4DC6F96DB984'::uuid,
                                                  '4B36AFC8-5205-49C1-AF16-4DC6F96DB982'::uuid);


