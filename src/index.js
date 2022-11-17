const { response } = require('express');
const express = require('express');

const app = express();

app.get('/login', (req, res) => {
    console.log("Dentro do Endpoint");
    res.status(200);
    res.send("Mercurio");
});

app.listen(3000, () => {
    console.log("Running Server")
});