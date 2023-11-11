const express = require('express');
const cors = require('cors');
const route = require('./routes/index');

const port = 3000;
const app = express();


app.use(cors());
app.use('/', route);



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
