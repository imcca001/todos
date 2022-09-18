INSERT INTO todolists (id, title, username)
  VALUES (1, 'Work Todos', 'admin'),
         (2, 'Home Todos', 'admin'),
         (3, 'Additional Todos', 'admin'),
         (4, 'social todos', 'admin');

-- Note: in the following statement, get the todo list IDs from
-- the todolists table. If the todo list IDs are 1, 2, 3, and 4, then our code
-- looks like this:
INSERT INTO todos (title, done, todolist_id, username)
  VALUES ('Get coffee', TRUE, 1, 'admin'),
         ('Chat with co-workers', TRUE, 1, 'admin'),
         ('Duck out of meeting', FALSE, 1, 'admin'),
         ('Feed the cats', TRUE, 2, 'admin'),
         ('Go to bed', TRUE, 2, 'admin'),
         ('Buy milk', TRUE, 2, 'admin'),
         ('Study for Launch School', TRUE, 2, 'admin'),
         ('Go to Libby''s birthday party', FALSE, 4, 'admin');

INSERT INTO users (username, password)
  VALUES ('admin', '$2b$10$KZg.xAGkJu5aN4.FcS1E5uD8ULOWeIEBvVApopb0IT367EMBqXj5K');

-- let bcrypt = require("bcrypt");
-- bcrypt.hash("secret", 10, (_, hash) => console.log(hash));