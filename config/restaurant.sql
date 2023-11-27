create database restaurant;
use restaurant;

CREATE TABLE restaurant (
	restaurant_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(25) NOT NULL,
    style VARCHAR(50) NOT NULL,
    picture VARCHAR(200),
    phone_number CHAR(9) NOT NULL,
    restaurant_description VARCHAR(200) NOT NULL,
	email VARCHAR(75) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
	restaurant_isdeleted BOOLEAN DEFAULT false
);

insert into restaurant (name, style, phone_number, restaurant_description, email, password) value 
("El Rinconcito", "Comida tradicional", "654654654", "Un lugar acogedor para venir en familia", "elrinconcito@correo.com", "elrinconcito654");
insert into restaurant (name, style, phone_number, restaurant_description, email, password) value 
("Casa Tomasa", "Comida peruana", "622622622", "¿Quieres viajar a otro continente por el estómago?¡Aquí es!", "casatomasa@correo.com", "casatomasa622");
insert into restaurant (name, style, phone_number, restaurant_description, email, password) value 
("Vegan junk", "Comida vegana", "632632632", "Dicen las malas lenguas que la comida vegana es sana, aquí no es el caso", "veganjunk@correo.com", "veganjunk632");


select * from restaurant;


CREATE TABLE dish (
	dish_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(25) NOT NULL,
    dish_description VARCHAR(200) NOT NULL,
    image VARCHAR(200),
    dish_isdeleted BOOLEAN DEFAULT false,
    restaurant_id INT UNSIGNED NOT NULL,
	CONSTRAINT fk_restaurant_1 FOREIGN KEY (restaurant_id)
	REFERENCES restaurant(restaurant_id) ON DELETE CASCADE ON UPDATE CASCADE
);

insert into dish (title, dish_description, restaurant_id) value ("Migas", "¿Sabes que en Almería se comen migas cuando llueve?", 1);
insert into dish (title, dish_description, restaurant_id) value ("Papa a la huancaína", "Típico entrante de comida peruana con salsa de queso y ají amarillo", 2);
insert into dish (title, dish_description, restaurant_id) value ("Massive Burguer", "No le digas a tu amigo carnívoro que es vegana, ¡ni se enterará!", 3);

select * from dish;