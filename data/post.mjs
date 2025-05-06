import { db } from "../db/database.mjs";

const SELECT_JOIN =
  "SELECT p.id, u.userid, u.name, u.url, p.useridx, p.text, p.createdAt FROM users as u JOIN posts as p ON u.idx = p.useridx";

const ORDER_DESC = "ORDER BY p.createdAt DESC";

// 모든 트윗을 리턴
export async function getAll() {
  return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => result[0]);
}

// 아이디에 대한 트윗을 리턴
export async function getAllByUserid(userid) {
  return db
    .execute(`${SELECT_JOIN} WHERE u.userid=? ${ORDER_DESC}`, [userid])
    .then((result) => result[0]);
}

// 글 번호에 대한 트윗을 리턴
export async function getById(id) {
  return db
    .execute(`${SELECT_JOIN} WHERE p.id=?`, [id])
    .then((result) => result[0][0]);
}

// 트윗을 작성
export async function create(text, useridx) {
  console.log(text, useridx);
  return db
    .execute("INSERT INTO posts (useridx, text, createdAt) VALUES (?, ?, ?)", [
      useridx,
      text,
      new Date(),
    ])
    .then((result) => getById(result[0].insertId));
}

// 트윗을 변경
export async function update(id, text) {
  return db
    .execute("UPDATE posts SET text=? WHERE id=?", [text, id])
    .then(() => getById(id));
}

// 트윗을 삭제
export async function remove(id) {
  return db.execute("DELETE FROM posts WHERE id=?", [id]);
}
