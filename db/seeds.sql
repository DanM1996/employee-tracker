INSERT INTO department (name) 
VALUES
('Sales'),
('Marketing'),
('IT'),
('Quality Care'),
('HR');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Lead', 62000.00, 6),
('Quality Care Manager', 65000.00, 2),
('HR Rep', 53000.00, 19),
('Marketing Strategist', 59000.00, 14),
('IT Staff', 72000.00, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('Emil', 'Gibbson', 6, 4),
('Shauna', 'Lakyree', 14, 2),
('Hector', 'Law', 4, 2),
('Lansel', 'Fisher', 19, 4),
('Gabriel', 'Jetson', 2, 2);