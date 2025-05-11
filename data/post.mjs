import Mongoose from "mongoose";
import { useVirtualId } from "../db/database.mjs";
import * as UserRepository from "./auth.mjs";

const postSchema = new Mongoose.Schema(
  {
    text: { type: String, require: true },
    userId: { type: String, require: true },
    name: { type: String, require: true },
    userid: { type: String, require: true },
    url: String,
  },
  { timestamps: true }
);

useVirtualId(postSchema);
const Post = Mongoose.model("Post", postSchema);

// 모든 포스트를 리턴
export async function getAll() {
  return Post.find().sort({ createdAt: -1 });
}

// 사용자 아이디(userid)에 대한 포스트를 리턴
export async function getAllByUserid(userid) {
  return Post.find({ userid }).sort({ createdAt: -1 });
}

// 글 번호(id)에 대한 포스트를 리턴
export async function getById(id) {
  return Post.findById(id);
}

// 포스트를 작성
export async function create(text, userId) {
  return UserRepository.findById(userId).then((user) =>
    new Post({
      text,
      userId,
      name: user.name,
      userid: user.userid,
    }).save()
  );
}

// 포스트를 변경
export async function update(id, text) {
  return Post.findByIdAndUpdate(id, { text }, { returnDocument: "after" });
}

// 포스트를 삭제
export async function remove(id) {
  return Post.findByIdAndDelete(id);
}
