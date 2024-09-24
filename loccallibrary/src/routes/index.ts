import { Router, Request, Response } from "express";
import authorRouter from "./author.route";
import bookRouter from "./book.route";
import genreRouter from "./genre.route";
import bookInstanceRouter from "./bookInstance.route";

// import all route modules for your site at here
const router: Router = Router();
// ...

router.get("/", (req: Request, res: Response) => {
  res.render("index", { title: "Express" });
});

router.use("/authors", authorRouter);
router.use("/books", bookRouter);
router.use("/genres", genreRouter);
router.use("/bookInstances", bookInstanceRouter);

export default router;
