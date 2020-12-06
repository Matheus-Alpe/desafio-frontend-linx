const express = require("express");
const app = express();
const port = process.env.port || 3000;

app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
    res.render('index.html');
});

app.listen(port, () => console.log(`Running at localhost:${port}`));
