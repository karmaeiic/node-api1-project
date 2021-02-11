// BUILD YOUR SERVER HERE

const express = require("express")
const db = require("./database")

server.use(express.json())
server.use(cors())

server.get("/", (req, res) => {
	res.json({ message: "Successful GET request" });
});

server.get("/users", (req, res) => {
	const users = db.getUsers()
	res.json(users)
})

server.get("/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)
    if (user) {
        res.json(user)
    } else {
        res.status(404).json({
            message: "User not found"
        })
    }
})

server.delete("/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)
    if (user) {
        db.deleteUser(user.id)
        res.status(204).end()
    } else {
        res.status(404).json({
            message: "User not Found"
        })
    }
})

server.put("/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        const updatedUser = db.updateUser(user.id, {
            name: req.body.name,
        })

        res.json(updatreUser)
    } else {
        res.status(404).json({
            message: "User not Found"
        })
    }
})

module.exports = {server}; // EXPORT YOUR SERVER instead of {}
