import express from "express";
import http from "http";

import createError from "http-errors"; // Properly import http-errors
import morgan from "morgan"; // Properly import morgan
import cookieParser from "cookie-parser"; // Properly import cookie-parser
import path from "path";

import indexRouter from "./routes/index"; // Assuming your index router is in the routes/index.js or routes/index.ts
import usersRouter from "./routes/index"; // Assuming your users router is in the routes/users.js or routes/users.ts

import { Request, Response, NextFunction } from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(500); // err.status
  res.render("error");
});

// Set Pug as the view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

const server = http.createServer(app);
server.listen(Number(process.env.PORT) || 3000, () => {
  console.log("Server is running on port", process.env.PORT || 3000);
});
