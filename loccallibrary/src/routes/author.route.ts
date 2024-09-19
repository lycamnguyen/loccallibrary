import express from "express";
import * as authorController from "../controllers/author.controller";
const router = express.Router();

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get("/create", authorController.authorCreateGet);
// POST request for creating Author.
router.post("/create", authorController.authorCreatePost);

// GET request to update Author.
router.get("/update", authorController.authorUpdateGet);
// POST request to update Author.
router.post("/update", authorController.authorUpdatePost);

// GET request to delete Author.
router.get("/:id/delete", authorController.authorDeleteGet);
// POST request to delete Author.
router.post("/:id/delete", authorController.authorDeletePost);

router.get("/:id/detail", authorController.authorDetail);

router.get("/list", authorController.authorList);

export default router;
