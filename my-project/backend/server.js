const express = require('express');
const multer = require('multer');
const path = require('path');
const { exec } = require('child_process');
const app = express();
const port = 3000;

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Folder where uploaded PDFs will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Unique filename
  },
});
const upload = multer({ storage });

// Serve a basic HTML form (optional)
app.get('/', (req, res) => {
  res.send(`
    <form ref='uploadForm' 
        id='uploadForm' 
        action='/upload' 
        method='post' 
        encType="multipart/form-data">
        <input type="file" name="pdfFile" />
        <input type='submit' value='Upload!' />
    </form>
  `);
});

// Handle the file upload and call the Python script
app.post('/upload', upload.single('pdfFile'), (req, res) => {
  console.log(req.file);  // Log the uploaded file object

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const pdfPath = req.file.path;
  console.log(`File uploaded to: ${pdfPath}`);

  // Use `python` (instead of `python3`) or the full path to Python executable
  exec(`python extract_pdf_data.py ${pdfPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send('Error processing PDF.');
    }

    // Parse the output from the Python script and send the data as JSON
    const extractedData = JSON.parse(stdout);
    res.json(extractedData);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  
});
