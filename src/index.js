const { response } = require('express');
const express = require('express');

const app = express();

app.get('/login', (req, res) => {
    res.status(200);
    res.send("Login");
});

app.listen(3000, () => {
    console.log("Running Server")
});