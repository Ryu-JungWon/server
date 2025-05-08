import MongoDb from "mongodb";
import { getPosts } from "../db/database.mjs";
import * as UserRepository from "./auth.mjs";
const ObjectID = MongoDb.ObjectId;

// 모든 포스트를 리턴
export async function getAll() {
  return getPosts().find().sort({ createdAt: -1 }).toArray(); //.then(mapPosts);
}

// 사용자 아이디(userid)에 대한 포스트를 리턴
export async function getAllByUserid(userid) {
  return getPosts().find({ userid }).sort({ createdAt: -1 }).toArray();
  //.then(mapPosts);
}

// 글 번호(id)에 대한 포스트를 리턴
export async function getById(id) {
  return getPosts()
    .find({ _id: new ObjectID(id) })
    .next()
    .then(mapOptionalPost);
}

// 포스트를 작성
export async function create(text, id) {
  console.log("id: ", id);
  return UserRepository.findById(id)
    .then((user) =>
      getPosts().insertOne({
        text,
        createdAt: new Date(),
        idx: user.id,
        name: user.name,
        userid: user.userid,
        url: user.url,
      })
    )
    .then((result) => {
      return getPosts().findOne({ _id: result.insertedId });
    });
  // .then(mapOptionalPost);
}

// 포스트를 변경
export async function update(id, text) {
  return getPosts()
    .findOneAndUpdate(
      { _id: new ObjectID(id) },
      { $set: { text } },
      { returnDocument: "after" }
    )
    .then((result) => result);
  // .then(mapOptionalPost);
}

// 포스트를 삭제
export async function remove(id) {
  return getPosts().deleteOne({ _id: new ObjectID(id) });
}

function mapOptionalPost(post) {
  return post ? { ...post, id: post._id.toString() } : post;
}

// function mapPosts(posts) {
//   return posts.map(mapOptionalPost);
// }
