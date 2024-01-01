const express = require("express");
const { connectToMongoDb } = require('./connection');

const { logReqRes } = require('./middlewares/logReqRes')

const userRoute = require('./routes/users')

const app = express();

app.set("view engine", "ejs");

//connection
connectToMongoDb("mongodb://127.0.0.1:27017/test1")
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log("DB connect Err: ", err));

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes('logs.txt'))

//route
app.use('/api/users', userRoute);

app.listen(3000, () => console.log("Server started on port 3000"));
