const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route for adding a recipient
router.post('/add', async (req, res) => {
    try {
        const { userId, recipient } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        user.recipients.push(recipient);
        await user.save();
        res.status(200).send({ message: 'Recipient added', recipients: user.recipients });
    } catch (error) {
        res.status(500).send({ message: 'Error adding recipient', error });
    }
});

module.exports = router;
