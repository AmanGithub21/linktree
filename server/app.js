require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const linktreeRoutes = require("./routes/linktreeRoutes");
const User = require("./models/User");
const Linktree = require("./models/Linktree");
const dbUrl = process.env.DB_URL;
const port = process.env.PORT;

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: true,
    optionsSuccessStatus: 204,
  })
);

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("DB connected");
  })
  .catch((e) => {
    console.log("DB NOT CONNECTED", e);
  });

app.use(express.json());
// app.use(express.static(path.join(__dirname, "/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/build", "index.html"));
// });

app.use("/account", authRoutes);
app.use("/linktree", linktreeRoutes);

app.post("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (user) {
      const linktree = await Linktree.findOne({ user: user.id });
      return res.status(200).json(linktree);
    } else return res.status(200).json("notfound");
  } catch (error) {
    console.log("ERROR IN app.js");
    return res.status(500).json(error.message);
  }
});

app.get("/test", async (req, res) => {
  res.send("Test success");
});

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server running on Port ${port}`);
});
