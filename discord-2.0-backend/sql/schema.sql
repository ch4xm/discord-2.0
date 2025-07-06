
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    avatar TEXT
);
