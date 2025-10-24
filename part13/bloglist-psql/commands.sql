CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  title text NOT NULL,
  url text NOT NULL,
  likes integer DEFAULT 0
);

INSERT INTO blogs (author, title, url) VALUES ('Author 1', 'Url 1', 'Title 1');
INSERT INTO blogs (author, title, url) VALUES ('Author 2', 'Url 2', 'Title 2');
