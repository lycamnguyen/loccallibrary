import express from "express";
import * as bookController from "../controllers/book.controller";
const router = express.Router();

// GET request for creating book. NOTE This must come before route for id (i.e. display book).
router.get("/create", bookController.bookCreateGet);
// POST request for creating book.
router.post("/create", bookController.bookCreatePost);

// GET request to delete book.
router.get("/update", bookController.bookUpdateGet);
// POST request to update book.
router.post("/update", bookController.bookUpdatePost);

// GET request to delete book.
router.get("/:id/delete", bookController.bookDeleteGet);
// POST request to delete book.
router.post("/:id/delete", bookController.bookDeletePost);

router.get("/:id/detail", bookController.bookDetail);

router.get("/list", bookController.bookList);

export default router;
