// console.log("JAY SREE GANESH");
// console.log("rrrrrrrrrrrrrrrr");

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
dotenv.config();
require("./db");

const userRouter = require("./routes/usersRoutes");

// console.log("express",express);
const app = express();
app.use(cors());
// console.log("app",app);
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use("/api/users", userRouter);
