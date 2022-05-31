import express from 'express';
import Data from './data.js';
const app = express();
app.get('/api/courses', (req, res) => {
  res.send(Data.courses);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('server started at http://localhost:${port}');
});
