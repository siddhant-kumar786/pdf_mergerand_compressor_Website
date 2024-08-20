const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { mergePdfs } = require('./merge');

const app = express();
const port = 3000;

// Set the public folder to serve static files
app.use(express.static(path.join(__dirname, 'public')));

const upload = multer({ dest: 'uploads/' });
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/index.html'));
});

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
  try {
    let mergedFileName = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path));
    let mergedFilePath = path.join(__dirname, 'public', `${mergedFileName}.pdf`);

    // Send the merged file as a response for download
    res.download(mergedFilePath, 'merged.pdf', async (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error downloading the file');
      } else {
        console.log('File sent successfully');
        
        // Delete uploaded files
        req.files.forEach(file => {
          fs.unlink(file.path, (err) => {
            if (err) console.error(`Error deleting file ${file.path}:`, err);
            else console.log(`Deleted file ${file.path}`);
          });
        });

        // Delete merged file
        fs.unlink(mergedFilePath, (err) => {
          if (err) console.error(`Error deleting file ${mergedFilePath}:`, err);
          else console.log(`Deleted file ${mergedFilePath}`);
        });
      }
    });
  } catch (error) {
    console.error('Error merging PDFs:', error);
    res.status(500).send('Error merging the PDFs');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
