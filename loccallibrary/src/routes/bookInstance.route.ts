import express from "express";
import * as bookInstanceController from "../controllers/bookInstance.controller";
const router = express.Router();

// GET request for creating bookInstance. NOTE This must come before route for id (i.e. display bookInstance).
router.get("/create", bookInstanceController.bookInstanceCreateGet);
// POST request for creating bookInstance.
router.post("/create", bookInstanceController.bookInstanceCreatePost);

// GET request to delete bookInstance.
router.get("/update", bookInstanceController.bookInstanceUpdateGet);
// POST request to update bookInstance.
router.post("/update", bookInstanceController.bookInstanceUpdatePost);

// GET request to delete bookInstance.
router.get("/:id/delete", bookInstanceController.bookInstanceDeleteGet);
// POST request to delete bookInstance.
router.post("/:id/delete", bookInstanceController.bookInstanceDeletePost);

router.get("/:id/detail", bookInstanceController.bookInstanceDetail);

router.get("/list", bookInstanceController.bookInstanceList);

export default router;
