/**
 * Setup express server.
 */

import path from "path";

import express, { Request, Response } from "express";

import "express-async-errors";

import BaseRouter from "./routes";

import Paths from "./common/Paths";

// **** Variables **** //

const app = express();

// **** Setup **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add APIs, must be after middleware
app.use(Paths.Base, BaseRouter);

// ** Front-End Content ** //

// Set views directory (html)
const viewsDir = path.join(__dirname, "views");
app.set("views", viewsDir);

// Set static directory (js and css).
const staticDir = path.join(__dirname, "public");
app.use(express.static(staticDir));

// Nav to login pg by default
app.get("/", (_: Request, res: Response) => {
  res.sendFile("login.html", { root: viewsDir });
});

// **** Export default **** //

export default app;
