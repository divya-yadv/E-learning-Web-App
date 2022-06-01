import express from 'express';
import data from './data.js';
//create express app
const app = express();

//create api to send data from this path
app.get('/api/courses', (req, res) => {
  res.send(data.courses);
});

//listen to port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
