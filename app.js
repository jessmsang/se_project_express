const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const user = require("./models/user");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect(
    "mongodb+srv://jessmsang:W5bD65TAT7UvRsLt@my-first-cluster.7bub5mw.mongodb.net/wtwr_db"
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "6835c80ce11064f79dad68a8",
  };
  next();
});
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
