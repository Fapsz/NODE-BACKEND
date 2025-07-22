import e from "express";
import {
  addcomments,
  del1Comment,
  get1comment,
  getAllcomments,
  update1comment,
} from "../controllers/commentcontroller.js";
import authorize from "../middlewares/authorize.js";
const router = e.Router();

router.post("/:postId", authorize(["Admin", "User"]), addcomments);

router.get("/", getAllcomments);
router.get("/:id", get1comment);
router.put("/:id", update1comment);
router.delete("/:id", del1Comment);

export default router;
