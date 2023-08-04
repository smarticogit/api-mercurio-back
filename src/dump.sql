
create database mercurio;

create table if not exists users(
	id SERIAL primary key,
	name VARCHAR(255),
	email VARCHAR(255) unique,
	password VARCHAR(255) 
)

INSERT INTO public.users(
	name, email, password)
	VALUES ( 'Daniel', 'daniel@email.com', 'da1234');