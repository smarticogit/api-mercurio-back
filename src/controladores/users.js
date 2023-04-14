const users = require('../dados/dados');

const listarUsuarios = (req, res) => {
    res.status(200).send(users);
}

const obterUsuario = (req, res) => {
    const { id } = req.params;

    if(Number(id) > users.length) {
        res.send("Id inválido")
    } else {
        const user = users.find( user => user.id === Number(id));
        res.status(200).send(user)
    }
}

const criarUsuario = (req, res) => {
    const dados = req.body;

    const novoUsuario = {
        id: users.length + 1,
        name: dados.name,
        email: dados.email,
        password: dados.password
    }

    users.push(novoUsuario);
    res.status(201).send(novoUsuario);
}

module.exports = { 
    listarUsuarios,
    obterUsuario,
    criarUsuario
}