
DELETE FROM users;

INSERT INTO users (username, email, password, avatar)
VALUES ('test', 'test@gmail.com', crypt('testuser', gen_salt('bf')), 'https://i.pinimg.com/originals/36/73/b2/3673b220d40793ab3bdb0114aca65803.gif');
