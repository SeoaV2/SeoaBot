create table obt_whitelist (
  serverid varchar(18) not null,
  ownerid varchar(18) not null,
  enabledAt timestamp default current_timestamp not null,
  primary key (serverid)
);
