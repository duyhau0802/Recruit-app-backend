import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getUsers() {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
}

export async function getUser(id) {
  const [rows] = await pool.query(
    `
        SELECT * 
        FROM users
        WHERE id = ?
        `,
    [id]
  );
  return rows[0];
}

export async function createUser(user) {
  const { username, email, password } = user;
  const [result] = await pool.query(
    `
        INSERT INTO users
        (username, email, password)
        VALUES
        (?, ?, ?)
        `,
    [username, email, password]
  );
  const id = result.insertId;
  return getUser(id);
}

const user = {
  username: "John",
  email: "XjQpH@example.com",
  password: "123456",
};

// const users = await getUsers();
// console.log(users);
// const row = await createUser(user);
// console.log(row);
