USE employees_db;
INSERT INTO department (name)
VALUES ('Marketing'),
('Development'),
('Design'),
('Finance'),
('Admin');

INSERT INTO role (title, salary, department_id)
VALUES ('Marketing Manager', 95000, 1),
('Marketing Associate', 48000, 1),
('Software Development Manager', 130000, 2),
('Senior Software Engineer', 119000, 2),
('Junior Software Engineer', 62000, 2),
('Design Manager', 85000, 3),
('Senior Graphic Designer', 63000, 3),
('Junior Graphic Designer', 41000, 3),
('Financial Manager', 75000, 4),
('Financal Analyst', 60000, 4),
('Administrative Manager', 60000, 5),
('Administrative Assistant', 35000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Denise', 'Kang', 1, null),
('John', 'Kim', 2, 1),
('Jason', 'Choi', 2, 1),
('Ruth', 'Park', 3, null),
('Steven', 'Chang', 4, 3),
('Tran', 'Pham', 5, 3),
('Susan', 'Smith', 5, 3),
('Dia', 'Seu', 5, 3),
('Donna', 'Warby', 6, null),
('Stephanie', 'Cho', 7, 6),
('Rose', 'Seo', 8, 6),
('Penelope', 'Garcia', 9, null),
('Hector', 'Suarez', 10, 9),
('Eunice', 'Winter', 10, 9),
('Vanessa', 'Song', 11, null),
('Bianca', 'Lee', 12, 11),
('Sophia', 'Strong', 12, 11);

