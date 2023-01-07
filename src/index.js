const usuarios = require('./dados/dados');
const { response } = require('express');
const express = require('express');

const app = express();

app.get('/usuarios', (req, res) => {
    res.status(200);
    res.send(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const usuario = usuarios.find(user => user.id === Number(id));
    res.status(200);
    res.send(usuario);
});

app.listen(3000, () => {
    console.log("Running Server")
});