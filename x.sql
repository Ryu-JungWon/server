use nodejs;

drop table users;
create table users (
	idx int auto_increment primary key,
    userid varchar(50) unique not null,
    password varchar(50) not null,
    name varchar(20) not null,
    email varchar(50) not null,
    url varchar(200)
);

select * from users;

create table posts (
	id int auto_increment primary key,
    userid int not null,
    createdAt datetime default now(),
    text varchar(2000) not null,
    foreign key(userid) references users(idx)
);

select * from posts;