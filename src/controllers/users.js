const users = require("../database/data");
const pool = require("../connection");

const usersList = async (req, res) => {
  try {
    const query = "select * from users";
    const usersList = await pool.query(query);
    return res.status(200).send(usersList.rows);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const userGet = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `select * from users where id = $1`;
    const params = [Number(id)];

    const userFound = await pool.query(query, params);
    if (userFound.rowCount === 0) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(userFound.rows[0]);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const userCreate = async (req, res) => {
  const data = req.body;

  try {
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    const queryEmail = "select * from users where email = $1";
    const paramsEmail = [newUser.email];

    const emailExists = await pool.query(queryEmail, paramsEmail);

    if (emailExists.rowCount > 0) {
      return res.status(404).send({ message: "Email already exists" });
    }

    const query =
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)";

    const params = [newUser.name, newUser.email, newUser.password];

    const result = await pool.query(query, params);

    if (result.rowCount === 0) {
      return res.status(404).send({ message: "User not created" });
    }
    res.status(201).send(newUser);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const userUpdate = (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  if (Number(id) > users.length) {
    res.send("Invalid ID");
  } else {
    const user = users.find((user) => user.id === Number(id));

    user.name = name;
    user.email = email;
    user.password = password;

    res.status(200).send("User updated!");
  }
};

const userDelete = (req, res) => {
  const { id } = req.params;

  const indexUser = users.findIndex((user) => user.id === Number(id));
  users.splice(indexUser, 1);

  res.status(200).send("User deleted!");
};

module.exports = {
  usersList,
  userGet,
  userCreate,
  userUpdate,
  userDelete,
};
