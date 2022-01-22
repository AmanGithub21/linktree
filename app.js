require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const linktreeRoutes = require("./routes/linktreeRoutes");

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
app.use(cors());

app.use("/account", authRoutes);
app.use("/linktree", linktreeRoutes);

app.get("/", (req, res) => {
    return res.send("<h1>Hello Linktree</h1>");
});

app.listen(8080, (req, res) => {
    console.log("Server running on Port 8080");
});
