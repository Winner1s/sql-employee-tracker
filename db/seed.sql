INSERT INTO departments (name) VALUES ('Associate'), ('Engineering'), ('sales'), ('financing'), ('legal');

INSERT INTO roles (title, salary, department_id)
VALUES ('Associate', 50000, 1),
       ('Software Engineer', 85000, 2),
       ('Salesperson', 90000, 3),
       ('Accountant', 125000, 4),
       ('Lawyer', 200000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Stefany', 'Jackson', 5, 4),
       ('Anna', 'Koch', 5, 3),
       ('Michael', 'Jackson', 5, 2),
       ('Susan', 'Summers', 5, 1),
       ('Jim', 'Beam', 4, 2),
       ('Tanya', 'Register', 4, 1),
       ('Steve', 'Harding', 3, 1),
       ('Robert', 'Johnson', 2, 2),
       ('Andre', 'Smith', 1, 2),
       ('Justin', 'Roberts', 4, 3),
       ('Reda', 'Aoun', 1, 3),
       ('Ashley', 'Botega', 4, 4),
       ('Keisha', 'Anderson', 3, 4),
       ('Emilio', 'Estevez', 5, 5),
       ('Autumn', 'Jobs', 4, 5),
       ('Ritz', 'Chio', 2, 3),
       ('Blaine', 'Broccoli', 1, 4),
       ('Shanique', 'Cassant', 2, 4),
       ('John', 'Wright', 2, 5),
       ('Chip', 'Anders', 1, 5),
       ('Cassie', 'Jenkins', 1, 1),
       ('Robert', 'Bass', 2, 1),
       ('Seka', 'Rogers', 1, 4),
       ('Melinda', 'Tolbert', 1, 4),
       ('Rico', 'Suave', 3, 4),
       ('Lexis', 'Honda', 3, 3);



--   inserting data into the "departments", "roles", and "employee" tables, populating them with department names, role titles, salaries, and employee details.


