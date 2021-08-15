-- Once you create the tables, populate it with the seeds data located here

INSERT INTO department (name) 
VALUES
('Sales'),
('Marketing'),
('IT'),
('Quality Care'),
('HR');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Lead', 62000.00, 1),
('Quality Care Manager', 65000.00, 4),
('HR Rep', 53000.00, 5),
('Marketing Strategist', 59000.00, 2),
('IT Staff', 72000.00, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('Emil', 'Gibbson', 5, 1),
('Shauna', 'Lakyree', 2, 1),
('Hector', 'Law', 2, 2),
('Lansel', 'Fisher', 3, 2),
('Gabriel', 'Jetson', 4, 0);