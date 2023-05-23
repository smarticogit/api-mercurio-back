const users = require('../database/data');
const pool = require('../connection');

const usersList = async (req, res) => {
    try {
        const usersList = await pool.query('select * from uses');
        res.status(200).send(usersList.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const userGet = (req, res) => {
    const { id } = req.params;

    if(Number(id) > users.length) {
        res.send("Invalid ID")
    } else {
        const user = users.find( user => user.id === Number(id));
        res.status(200).send(user)
    }
}

const userCreate = (req, res) => {
    const data = req.body;

    const newUser = {
        id: users.length + 1,
        name: data.name,
        email: data.email,
        password: data.password
    }

    users.push(newUser);
    res.status(201).send(newUser);
}

const userUpdate = (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if(Number(id) > users.length) {
        res.send("Invalid ID")
    } else {
        const user = users.find( user => user.id === Number(id));

        user.name = name;
        user.email = email;
        user.password = password;

        res.status(200).send("User updated!")
    }
}

const userDelete = (req, res) => {
    const {id} = req.params;

    const indexUser = users.findIndex(user => user.id === Number(id) )
    users.splice(indexUser, 1)

    res.status(200).send("User deleted!")
}

module.exports = { 
    usersList,
    userGet,
    userCreate,
    userUpdate,
    userDelete
}