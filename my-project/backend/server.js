require('dotenv').config(); // Load environment variables
const express = require('express');
const multer = require('multer');
const path = require('path');
const { exec } = require('child_process');
const { sendReminderEmail } = require('./utils/email'); // Import the updated email utility
const fetchUser = require('./middleware/fetchUser'); // Middleware for authentication
const app = express();
const port = 3000;

app.use(express.json()); // Parse JSON requests

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Upload endpoint (authenticated)
app.post('/upload', fetchUser, upload.single('pdfFile'), async (req, res) => {
  const userEmail = req.user.email; // User's email from `fetchUser`
  const { companyName, dueDate, amountDue } = req.body; // Extracted from client input or PDF

  try {
    sendReminderEmail(companyName, dueDate, amountDue, userEmail);
    res.status(200).send('Reminder email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
