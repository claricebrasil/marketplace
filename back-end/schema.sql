CREATE DATABASE market_cubos;

CREATE TABLE usuarios (
	id serial primary key,
  	nome text not null,
  	nome_loja text not null,
  	email text not null unique,
  	senha text not null
);

CREATE TABLE produtos (
	id serial primary key,
  	usuario_id integer not null,
  	nome text not null,
  	estoque int,
  	categoria varchar(100),
  	preco int not null,
  	descricao text,
  	imagem text,
  	foreign key (usuario_id) references usuarios (id) 
);