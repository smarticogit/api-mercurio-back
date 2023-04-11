const express = require('express');
const users = require('./dados/dados');

const app = express();

app.get('/users', (req, res) => {
    res.status(200);
    res.send(users);
});

app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    if(Number(id) > users.length) {
        res.send("Id inválido")
    }

    const user = users.find( user => user.id === Number(id));

    res.status(200);
    res.send(user);
});

app.listen(3000, () => {
    console.log("Running Server")
});