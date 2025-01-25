const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Email credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your_email@gmail.com', // Replace with your email
        pass: 'your_email_password'  // Replace with your email password or app password
    }
});

// Endpoint to receive location and send an email
app.post('/sendAlert', async (req, res) => {
    const { latitude, longitude } = req.body;

    try {
        // Reverse geocoding using Nominatim API
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        const address = response.data.display_name;

        // Send email with location details
        const mailOptions = {
            from: 'your_email@gmail.com',
            to: 'emergency_contact@gmail.com', // Replace with the recipient's email
            subject: 'Emergency Alert!',
            text: `I need help! My location is:
Address: ${address}
Coordinates: Latitude ${latitude}, Longitude ${longitude}`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Alert sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error sending alert.' });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
