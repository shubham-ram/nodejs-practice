const express = require("express");

const { handleGetAllUsers, handleCreateNewUser, handleGetUserById, handleUpdateUserById, handlerDeleteUserById } = require('../controllers/users')

const router = express.Router()


router
    .route("/")
    .get(handleGetAllUsers)
    .post(handleCreateNewUser);

router
    .route("/:userId")
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handlerDeleteUserById);

module.exports = router