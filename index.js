const express = require("express");
const app = express();

app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
    res.render('index.html');
});

app.listen(process.env.PORT || 5000);
