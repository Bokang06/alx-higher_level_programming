-- creates the MySQL server user_Od_1 and grant all priviledges
CREATE USER IF NOT EXISTS user_Od_1@localhost IDENTIFIED BY 'user_Od_1_pwd':
GRANT ALL PRIVILEGES ON * . * TO user_Od_1@localhost:
