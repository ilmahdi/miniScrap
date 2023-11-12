const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/api/data', (req, res) => {


  const filePath = path.join(global.rootDir, 'data', "scraped-data.json");
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const jsonData = JSON.parse(data);

    res.json(jsonData);
  });
});

module.exports = router;