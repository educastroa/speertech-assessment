-- Users table seeds here (Example)
ALTER TABLE users
ALTER COLUMN password
SET DEFAULT '$2a$12$g7.PYo/Qg0l7pNzodeP7QOT37uGnPZSw.asXfGDKX/h36SOnau/fO';

INSERT INTO users (first_name, last_name, email) VALUES ('Alice', 'Smith', 'alice@test.com');
INSERT INTO users (first_name, last_name, email) VALUES ('Kira', 'Smith', 'kira@test.com');
