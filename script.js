document.getElementById('sendSmsButton').addEventListener('click', async () => {
    const response = await fetch('http://localhost:3000/send-sms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phoneNumber: '+918606454571', // Replace with the target phone number
            message: 'Hey, I am here!'
        }),
    });
    const data = await response.json();
    alert(data.message);
});