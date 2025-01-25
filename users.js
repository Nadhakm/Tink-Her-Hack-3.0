const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model

// Route for signing up a user
router.post('/signup', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).send({ message: 'Error creating user', error });
    }
});

// Route for retrieving user details
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching user', error });
    }
});

module.exports = router;
