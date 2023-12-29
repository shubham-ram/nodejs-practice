const express = require("express");
const fs = require("fs");
const userData = require("./MOCK_DATA.json");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.get("/users", (req, res) => {
    return res.render("user", { userData });
});

app
    .route("/api/user")
    .get((req, res) => {
        return res.render("user", { userData });
    })
    .post((req, res) => {
        const formData = req.body;

        userData.push({ ...formData, id: userData.length + 1 });

        fs.writeFile("./MOCK_DATA.json", JSON.stringify(userData), (err) => {
            if (err) {
                console.log(err);
            } else {
                return res.status(201).send({ status: "Success" });
            }
        });
    });

app
    .route("/api/users/:userId")
    .get((req, res) => {
        const userId = req.params.userId;
        const user = userData.find((data) => data?.id === +userId);

        if (!user) return res.status(404).json({ msg: "User does not exits" })

        return res.json(user);
    })
    .patch((req, res) => {
        const userId = +req.params.userId;
        const updatedData = req.body;

        userData.splice(userId - 1, 1, { ...updatedData, id: userId });

        fs.writeFile("./MOCK_DATA.json", JSON.stringify(userData), (err) => {
            if (err) {
                console.log(err);
            } else {
                return res.send({ status: "Successfully updated" });
            }
        });
    })
    .delete((req, res) => {
        const userId = +req.params.userId;

        userData.splice(userId - 1, 1);

        fs.writeFile("./MOCK_DATA.json", JSON.stringify(userData), (err) => {
            if (err) {
                console.log(err);
            } else {
                return res.send({ status: "Successfully Deleted" });
            }
        });
    });

app.listen(3000, () => console.log("Server started on port 3000"));
