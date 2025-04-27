import express from "express";
import * as postController from "../controller/post.mjs";
import { body } from "express-validator";
import { validate } from "../middleware/validator.mjs";
import { isAuth } from "../middleware/auth.mjs";

const router = express.Router();

const validatePost = [
  body("text").trim().isLength({ min: 3 }).withMessage("최소 3자이상 입력"),
  validate,
];

// 전체 포스트 또는 해당 아이디에 대한 포스트 가져오기
// GET
// http://127.0.0.1:8080/posts/
// http://127.0.0.1:8080/posts?userid=
router.get("/", isAuth, postController.getPosts);

// 글번호에 대한 포스트 가져오기
// GET
// http://127.0.0.1:8080/posts/:id
router.get("/:id", isAuth, postController.getPost);

// 포스트 쓰기
// POST
// http://127.0.0.1:8080/posts
// json 형태로 입력 후 추가된 데이터까지 모두 json으로 출력
router.post("/", validatePost, isAuth, postController.createPost);

// 포스트 수정하기
// PUT
// http://127.0.0.1:8080/posts/:id
// json 형태로 입력 후 추가된 데이터까지 모두 json으로 출력
router.put("/:id", validatePost, isAuth, postController.updatePost);

// 포스트 삭제하기
// DELETE
// http://127.0.0.1:8080/posts/:id
router.delete("/:id", isAuth, postController.deletePost);

export default router;
