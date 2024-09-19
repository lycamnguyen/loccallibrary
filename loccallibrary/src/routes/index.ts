import { Router } from "express";
import authorRouter from "./author.route";
import bookRouter from "./book.route";
import genreRouter from "./genre.route";
import bookInstanceRouter from "./bookInstance.route";
import i18nextMiddleware from "i18next-http-middleware";
import { Request, Response } from "express";
import i18next from "../i18n";
import setLocaleMiddleware from "../middleware/setLocaleMiddleware";

// import all route modules for your site at here
const router: Router = Router();
// ...

router.use(i18nextMiddleware.handle(i18next));
router.use(setLocaleMiddleware);

router.get("/", (req: Request, res: Response) => {
  res.render("index", {
    title: "Sun Asterisk",
    message: "Hello from Pug with TypeScript!",
    t: req.t,
  });
});

router.use("/authors", authorRouter);
router.use("/books", bookRouter);
router.use("/genres", genreRouter);
router.use("/bookInstances", bookInstanceRouter);

export default router;
