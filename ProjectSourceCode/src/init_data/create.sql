DROP TABLE IF EXISTS users;
CREATE TABLE users (
    username VARCHAR(50) PRIMARY KEY,
    password CHAR(60) NOT NULL
);

INSERT INTO users (username, password) 
VALUES 
('hhawksley0','Stu123456!'),
('ojarnell1', 'Stu123456!'),
('dhackwell2', 'Timber68%'),
('ckelland3', 'Table90@'),
('efontaine4', 'Rice88?'),
('rgant5', 'Yay7755#'),
('fbeckhouse6','ZooWoo113~'),
('mfalconer7', 'ThinkNow23!'),
('pgaiger8', 'AzulPlane76#'),
('randreassen9', 'LutalPhase349?');