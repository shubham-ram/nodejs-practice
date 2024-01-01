const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

//connection
mongoose
    .connect("mongodb://127.0.0.1:27017/test1")
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log("DB connect Err: ", err));

//schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: String,
    email: {
        type: String,
        requied: true,
        unique: true,
    },
    gender: {
        type: String,
        required: true,
    },
}, { timestamps: true });

//model
const User = mongoose.model("user", userSchema);

app.use(express.urlencoded({ extended: false }));

app.get("/users", async (req, res) => {
    const userInfo = await User.find({})
    return res.render("user", { userData: userInfo });
});

app
    .route("/api/users")
    .get(async (req, res) => {
        const allDBUsers = await User.find({})
        return res.json(allDBUsers)
    })
    .post(async (req, res) => {
        const formData = req.body;

        if (!formData) {
            return res.status(400).json({ msg: "All fields are required" })
        }

        const result = await User.create({
            firstName: formData.first_name,
            lastName: formData.last_name,
            email: formData.email,
            gender: formData.gender
        })

        return res.status(201).json({ msg: "user created" })

    });

app
    .route("/api/users/:userId")
    .get(async (req, res) => {
        const userId = req.params.userId;
        const user = await User.findById(userId)

        if (!user) return res.status(404).json({ msg: "User Not Found" })

        return res.json(user)
    })
    .patch(async (req, res) => {
        const userId = req.params.userId;
        const updatedData = req.body;

        await User.findByIdAndUpdate(userId, updatedData)
        return res.json({ msg: `Successfully updated ${userId}` })
    })
    .delete(async (req, res) => {
        const userId = req.params.userId;

        await User.findByIdAndDelete(userId)
        return res.json({ msg: `SuccessFully deleted ${userId}` })
    });

app.listen(3000, () => console.log("Server started on port 3000"));
