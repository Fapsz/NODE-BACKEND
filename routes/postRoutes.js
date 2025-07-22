import e from "express";
import {
  del1post,
  createPost,
  get1post,
  getAllPosts,
  update1post,
} from "../controllers/PostController.js";
import authorize from "../middlewares/authorize.js";
import upload from "../middlewares/multer.js";
const router = e.Router();

router.post(
  "/",
  authorize(["admin", "user"]),
  upload.single("image"),
  createPost
);

router.get("/:id", get1post);

router.get("/", getAllPosts);

router.get("/:id", del1post);

router.get("/:id", update1post);

export default router;
