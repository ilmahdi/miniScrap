const express = require('express');
const cors = require('cors');
const route = require('./routes/index');
const runScraper = require('./services/scraper');
const path = require('path');

const port = 3000;
const app = express();

global.rootDir = path.join(__dirname, '..');

app.use(cors());
app.use('/', route);

async function launchServer() {
  await runScraper();

  app.listen(port, '0.0.0.0',() => {
    console.log(`Express server is running on http://0.0.0.0:${port}.`);
  });
}

launchServer();


