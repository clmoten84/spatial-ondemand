-- Adding unique constraints to username and email columns of user_accts table
alter table user_accts add constraint username_uniq UNIQUE (username);
alter table user_accts add constraint email_uniq UNIQUE (email);

-- Adding indexes for username and email columns of user_accts table
create index username_idx on user_accts (username);
create index email_idx on user_accts (email);