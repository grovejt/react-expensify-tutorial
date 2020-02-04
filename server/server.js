const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

console.log('__dirname', __dirname);
app.use(express.static(path.join(__dirname, '../build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


app.listen(process.env.PORT || 3010 , () => {
    console.log('Server is up.');
});