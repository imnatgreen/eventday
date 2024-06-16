create table user (
  id TEXT not null primary key,
  username VARCHAR(31) not null unique,
  password_hash VARCHAR(255) not null,
  is_enabled BOOLEAN not null,
  is_admin BOOLEAN not null,
  reset_next_login BOOLEAN not null
);
create table user_session (
    id TEXT not null primary key,
    expires_at INTEGER not null,
    user_id TEXT not null,
    foreign key (user_id) references user(id)
);