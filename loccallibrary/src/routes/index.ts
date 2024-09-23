import { Router, Request, Response } from "express";
const router: Router = Router();
/* GET users listing. */
router.get("/", (req: Request, res: Response) => {
  res.send("respond with a resource");
});

router.get("/", (req: Request, res: Response) => {
  res.render("index", { title: "Express" });
});

export default router;
