create table user (
  id VARCHAR(15) primary key,
  username VARCHAR(31) not null unique,
  is_enabled BOOLEAN not null,
  is_admin BOOLEAN not null
);
create table user_key (
  id VARCHAR(255) primary key,
  user_id VARCHAR(15) not null,
  hashed_password VARCHAR(255),
  foreign key (user_id) references user(id)
);
create table user_session (
  id VARCHAR(127) primary key,
  user_id VARCHAR(15) not null,
  active_expires BIGINT not null,
  idle_expires BIGINT not null,
  foreign key (user_id) references user(id)
);