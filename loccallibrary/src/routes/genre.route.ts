import express from "express";
import * as genreController from "../controllers/genre.controller";
const router = express.Router();

// GET request for creating genre. NOTE This must come before route for id (i.e. display genre).
router.get("/create", genreController.genreCreateGet);
// POST request for creating genre.
router.post("/create", genreController.genreCreatePost);

// GET request to update genre.
router.get("/update", genreController.genreUpdateGet);
// POST request to update genre.
router.post("/update", genreController.genreUpdatePost);

// GET request to delete genre.
router.get("/:id/delete", genreController.genreDeleteGet);
// POST request to delete genre.
router.post("/:id/delete", genreController.genreDeletePost);

router.get("/:id/detail", genreController.genreDetail);

router.get("/list", genreController.genreList);

export default router;
