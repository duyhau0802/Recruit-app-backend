import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
import db from "./connectDb.js";

router.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);
  db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    (err, result) => {
      {
        if (err) {
          res.send({ err: err });
        }
        if (result.length > 0) {
          res.send({ message: "User already exists" });
        } else {
          let hashPassword = bcrypt.hashSync(password, 10);
          db.query(
            "INSERT INTO users (username, email, password) VALUES (?,?,?)",
            [username, email, hashPassword],
            (err, result) => {
              if (err) {
                res.send({ err: err });
              } else {
                res.send({ message: "success" });
              }
            }
          );
        }
      }
    }
  );
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.query(
      "SELECT id, email, password FROM users WHERE email = ?",
      [email]
    );
    if (!user.row.length) {
      return res.status(401).json({ message: "Email does not exist" });
    }
    const isPasswordValid = await bcrypt.compareSync(
      password,
      user[0].password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "wrong password" });
    }
    const sanitizedUser = {
      id: user.row[0].id,
      email: user.row[0].email,
    };
    res.status(200).json({ message: "success", user: sanitizedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// req.session.user = result;
// const id = user.id;
// const token = jwt.sign({ id }, "secret", {
//   expiresIn: "1d",
// });
// res.cookie("jwt", token, {
//   httpOnly: true,
//   sameSite: "None",
//   secure: true,
// });
// res.json({ authorize: true, result: result, token: token });

// midware
function authenToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  // const token = req.headers["x-access-token"];
  if (!token)
    return res
      .sendStatus(401)
      .send("Yo, we need a token, please give it to us");

  jwt.verify(token, "secret", (err, decoded) => {
    if (err)
      return res.json({ auth: false, message: "u failed to authentication" });
    else {
      req.userId = decoded.id;
      next();
    }
  });
}

router.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

export default router;
