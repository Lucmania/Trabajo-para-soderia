CREATE DATABASE soderia;
SHOW DATABASES;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_apellido VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    calle_altura VARCHAR(255) NOT NULL,
    piso VARCHAR(10),
    departamento VARCHAR(10),
    estado ENUM('habilitado', 'deshabilitado') DEFAULT 'habilitado' -- Cambiar a ENUM
);

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    descripcion TEXT
);

CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    nombre_apellido VARCHAR(255) NOT NULL,
    tipo_pedido ENUM('especifico', 'recurrente') NOT NULL,
    fecha_solicitada DATE, -- Permitir NULL para pedidos recurrentes
    hora_inicio TIME, -- Permitir NULL para pedidos recurrentes
    hora_fin TIME, -- Permitir NULL para pedidos recurrentes
    productos JSON NOT NULL,
    dias_recurrentes JSON, -- Puede ser NULL para pedidos específicos
    estado ENUM('pendiente', 'realizado') DEFAULT 'pendiente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

drop table pedidos;

select * from productos;
select * from clientes;
select * from pedidos;
select * from users;