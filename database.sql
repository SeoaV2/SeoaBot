create user seoafixed@localhost;
create schema seoafixed;
grant all privileges on seoafixed.* to seoafixed@localhost;
use seoafixed;

create table userdata
(
	id varchar(20) not null,
	locale varchar(5) default 'en-US' not null,
	registedAt TIMESTAMP default CURRENT_TIMESTAMP not null,
	quizscore int default 0 not null
);

create unique index userdata_id_uindex
	on userdata (id);

alter table userdata
	add constraint userdata_pk
		primary key (id);

create table blacklist
(
	id varchar(20) not null,
	reason text
);

create unique index blacklist_id_uindex
	on blacklist (id);

alter table blacklist
	add constraint blacklist_pk
		primary key (id);

create table mylist
(
	uid varchar(20) not null,
	track int not null,
	vid varchar(11) not null,
	vname text not null,
	vauthor text not null
);


create table queue
(
	oid bigint unsigned not null,
	gid varchar(20) not null,
	vid varchar(11) not null,
	vname text not null,
	vauthor text not null
)
