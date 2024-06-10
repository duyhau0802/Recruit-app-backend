import express from "express";
import cors from "cors";
require("dotenv").config();
import authRouters from "./src/routes/auth.js";
import initRoutes from "./src/routes";
import cookieParser from "cookie-parser";
import session from "express-session";
// import sequelize from "./sequelizeConnectDb.js";
require("./sequelizeConnectDb.js");
// import { getUser, createUser, getUsers } from "./database.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(
  session({
    key: "userId",
    secret: process.env.ACCESS_TOKKEN_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      // after 24h
      expires: 60 * 60 * 24,
    },
  })
);

initRoutes(app);

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// Define Routes

app.use("/auth", authRouters);

// book routes
// app.get("/books", (req, res) => {
//   const q = "select * from books";
//   db.query(q, (err, data) => {
//     if (err) {
//       return res.json(err);
//     } else {
//       return res.json(data);
//     }
//   });
// });
// app.post("/books", (req, res) => {
//   const q = "INSERT INTO books (`title`, `desc`,`price` ,`cover`) VALUES (?)";
//   const values = [
//     req.body.title,
//     req.body.desc,
//     req.body.price,
//     req.body.cover,
//   ];

//   db.query(q, [values], (err, data) => {
//     if (err) return res.json(err);
//     return res.json("Book has been created successfully");
//   });
// });
// app.delete("/books/:id", (req, res) => {
//   const bookId = req.params.id;
//   const q = "DELETE FROM books WHERE id = ?";

//   db.query(q, [bookId], (err, data) => {
//     if (err) return res.json(err);
//     return res.json("Book has been delete");
//   });
// });
// app.put("/books/:id", (req, res) => {
//   const bookId = req.params.id;
//   const q =
//     "UPDATE books SET `title` = ?, `desc` = ?, `price`=?, `cover`=? WHERE id = ?";

//   const values = [
//     req.body.title,
//     req.body.desc,
//     req.body.price,
//     req.body.cover,
//   ];

//   db.query(q, [...values, bookId], (err, data) => {
//     if (err) return res.json(err);
//     return res.json("Book has been update successfully");
//   });
// });

// user routes
// app.get("/users", async (req, res) => {
//   const users = await getUsers();
//   res.send(users);
// });
// app.get("/users/:id", async (req, res) => {
//   const user = await getUser(req.params.id);
//   res.send(user);
// });
// app.post("/users", async (req, res) => {
//   const { username, email, password } = req.body;
//   const user = await createUser({ username, email, password });
//   res.status(201).send(user);
// });
// end users routes

/// prevent all error
// app.use((err, req, res, next) => {
//   console.log(err);
//   res.status(500).json({ message: "Internal server error" });
// });

const port = process.env.PORT || 8800;
// app.listen(port, () => console.log(`Listen on port : ${port}`));

const listener = app.listen(port, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
