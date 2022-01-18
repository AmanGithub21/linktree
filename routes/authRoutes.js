const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT_ROUNDS);

router.get("/", (req, res) => {
    res.send("hello");
});

router.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(403).send("User already exist");

        const user = new User({
            username,
            password: await bcrypt.hash(password, saltRounds),
        });
        const result = await user.save();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(403).send("User dosen't exist");

        const result = await bcrypt.compare(password, user.password);
        if (result) return res.status(200).json("Logged In");
        else return res.status(404).json("Incorrect Password");
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

module.exports = router;
