DROP DATABASE IF EXISTS company;

CREATE DATABASE company;

USE company;

CREATE TABLE
    departments (
        id INTEGER AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );

CREATE TABLE
    roles (
        id INTEGER AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(30),
        salary DECIMAL,
        department_id INTEGER,
        CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments (id)
    );

create TABLE
    employees (
        id INTEGER AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        role_id INTEGER,
        manager_id INTEGER,
        CONSTRAINT fk_roles FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE SET NULL,
        CONSTRAINT fk_manager_id FOREIGN KEY (manager_id) REFERENCES roles (id) ON DELETE SET NULL
    )
    -- creating a database schema with three tables that are related to each other through primary key and foreign key relationships.