import { Router, Request, Response } from "express";
import { BookmarkService as service } from "../services";

const router = Router();

/*
Bookmarks router :
- define API endpoints
- check required params and map them if needed
- send to bookmarks service
 */

router.post("/", async (req: Request, res: Response) => {
  const url: string = req?.body?.url as string;
  try {
    const newBookmark = await service.addBookmark(url);
    return res.json(newBookmark);
  } catch (err) {
    return res.status(422).json({ error: "Impossible de créer le bookmark !" });
  }
});

router.get("/:id", (req: Request, res: Response) => {
  const id = req?.params?.id;
  return res.json(service.getBookmark(id));
});

router.get("/", (req: Request, res: Response) => {
  const page: number = Number(req?.query?.page) || 1;
  return res.json(service.getBookmarks(page));
});

router.put("/", (req: Request, res: Response) => {
  const id = req?.body?.id as string;
  const keywords: Array<string> = req?.body?.keywords as Array<string>;
  return res.json(service.updateKeywords(id, keywords));
});

router.delete("/", (req: Request, res: Response) => {
  const id = req?.body?.id as string;
  return res.json(service.deleteBookmark(id));
});

export default router;
