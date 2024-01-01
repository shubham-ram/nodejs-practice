const UserModal = require('../models/user')

async function handleGetAllUsers(req, res) {
    const allDBUsers = await UserModal.find({})
    return res.json(allDBUsers)
}

async function handleCreateNewUser(req, res) {
    const formData = req.body;

    if (!formData) {
        return res.status(400).json({ msg: "All fields are required" })
    }

    const result = await UserModal.create({
        firstName: formData.first_name,
        lastName: formData.last_name,
        email: formData.email,
        gender: formData.gender
    })

    return res.status(201).json({ msg: "user created", id: result._id })
}

async function handleGetUserById(req, res) {
    const userId = req.params.userId;
    const user = await UserModal.findById(userId)

    if (!user) return res.status(404).json({ msg: "User Not Found" })

    return res.json(user)
}

async function handleUpdateUserById(req, res) {
    const userId = req.params.userId;
    const updatedData = req.body;

    await UserModal.findByIdAndUpdate(userId, updatedData)
    return res.json({ msg: `Successfully updated ${userId}` })
}

async function handlerDeleteUserById(req, res) {
    const userId = req.params.userId;

    await UserModal.findByIdAndDelete(userId)
    return res.json({ msg: `SuccessFully deleted ${userId}` })

}

module.exports = {
    handleGetAllUsers,
    handleCreateNewUser,
    handleGetUserById,
    handleUpdateUserById,
    handlerDeleteUserById
}