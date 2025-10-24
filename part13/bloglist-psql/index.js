import express from "express";

import { CONFIG } from "./utils/config.js";
import { connectToDB } from "./utils/db.js";
import { unknownEndpoint } from "./middleware/unknownEndpoint.js";

import loginRouter from "./controllers/login.js";
import blogsRouter from "./controllers/blogs.js";
import usersRouter from "./controllers/users.js";
import authorsRouter from "./controllers/authors.js";

const app = express();

app.use(express.json());
app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/authors", authorsRouter);
app.use(unknownEndpoint);

const start = async () => {
  await connectToDB();

  app.listen(CONFIG.PORT, () =>
    console.log(`Server running on port ${CONFIG.PORT}`)
  );
};

start();
