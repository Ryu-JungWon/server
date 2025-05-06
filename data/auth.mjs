import { db } from "../db/database.mjs";

export async function findByUserid(userid) {
  return db
    .execute("SELECT * FROM users WHERE userid=?", [userid])
    .then((result) => result[0][0]);
}

export async function findById(idx) {
  return db
    .execute("SELECT * FROM users WHERE idx=?", [idx])
    .then((result) => result[0][0]);
}

export async function createUser(user) {
  const { userid, password, name, email, url } = user;
  return db
    .execute(
      "INSERT INTO users (userid, password, name, email, url) VALUES (?, ?, ?, ?, ?)",
      [userid, password, name, email, url]
    )
    .then((result) => result[0].insertId);
}
