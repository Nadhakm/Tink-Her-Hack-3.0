const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = 3000;

// Twilio credentials
const accountSid = 'YOUR_TWILIO_ACCOUNT_SID'; // Replace with your Account SID
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';   // Replace with your Auth Token
const client = twilio(accountSid, authToken);

app.use(bodyParser.json());

// Endpoint to send SMS
app.post('/send-sms', async (req, res) => {
    const { phoneNumber, message } = req.body;

    try {
        await client.messages.create({
            body: message,
            from: 'YOUR_TWILIO_PHONE_NUMBER', // Replace with your Twilio number
            to: phoneNumber
        });
        res.json({ message: 'SMS sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send SMS.' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
