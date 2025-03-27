const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

let countdownTime = null;
let endTime = null; // Store the end time as a timestamp

// Serve static files from the "src" directory
app.use(express.static(path.join(__dirname)));

// Endpoint to get the endTime
app.get('/api/countdownTime', (req, res) => {
    res.json({ countdownTime: endTime });
});

// Endpoint to set the endTime
app.post('/api/countdownTime', express.json(), (req, res) => {
    endTime = req.body.countdownTime;
    res.json({ success: true });
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});