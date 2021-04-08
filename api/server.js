const express = require("express")
const db = require("./database")

const server = express()

server.use(express.json())


//POST body request
server.post('/users', (req, res) => {
  if (!req.body.name) {
      return res.status(400).json({ message: "Need a username"})
  } else {
      db.insert({name: req.body.name})
      .then(success => {
          res.status(201).json(success)
      })
    .catch(() => {
        res.status(500).json({ message: "There was an error while saving the user to the database"})
     })
    }
})


//GET request that returns an array of users
server.get('/users', (req, res) => {
  const users = db.getUsers()
    .then(success => {
        res.json(success)
    })
    .catch(() => {
        res.status(500).json({ message: "The user info could not be found"})
    })
})

//GET request that returns the user object

server.get('/users/:id', (req, res) => {
  const user = db.getUserById(req.params.id)
    
  if (user) {
      res.json(user)
  } else {
      res.status(404).json({
          message: "User not found",
      })
  }
})

//DELETE request


server.delete('/users/:id', function(req, res) {
  const users = db.getUserById(req.params.id);
  
  if (user) {
    db.deleteUser(user.id)
    res.status(204).end()
  } else {
      res.status(404).json({
          message: "user not found",
      })
  }
});

//PUT request

server.put('/users/:id', function(req, res) {
  const {name, bio} = req.body;
    if (!name || !bio) {
        res.status(400).json({ message: "Please provide name and bio for user"})
    } else {
        db.update(req.params.id, res.body)
        .then(success => {
            if(!success)
                res.status(404).json({ message: "The user with the specified ID does not exist"})
            else 
                res.status(200).json(success)
        })
        .catch(() => {
            res.status(500).json({ message: "The user information could not be changed"})
        })
    }
});

module.exports = server