require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

mongoose
    .connect("mongodb://127.0.0.1:27017/linktreeDB")
    .then(() => {
        console.log("DB connected");
    })
    .catch((e) => {
        console.log("DB NOT CONNECTED", e);
    });

app.use(express.static("client/"));
app.use(express.json());

app.use("/user", userRoutes);
app.use("/", authRoutes);

app.get("/", (req, res) => {
    return res.write("<h1>Hello Linktree</h1>");
});

app.listen(8080, (req, res) => {
    console.log("Server running on Port 8080");
});
