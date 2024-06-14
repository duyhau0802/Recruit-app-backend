import express from "express";
import cors from "cors";
require("dotenv").config();
import authRouters from "./src/routes/auth.js";
import initRoutes from "./src/routes";
import cookieParser from "cookie-parser";
import session from "express-session";
require("./sequelizeConnectDb.js");

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
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      // after 24h
      expires: 60 * 60 * 24,
    },
  })
);

initRoutes(app);

app.use("/auth", authRouters);

const port = process.env.PORT || 8800;
app.listen(port, () => console.log(`Backend is listening on port : ${port}`));
