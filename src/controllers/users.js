const pool = require("../connection");

const usersList = async (req, res) => {
  try {
    const usersList = await pool.query("select * from users");

    if (usersList.rowCount === 0) {
      return res.status(404).send({ message: "Users not found" });
    }
    return res.status(200).send(usersList.rows);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const userGet = async (req, res) => {
  const { id } = req.params;

  try {
    const query = "select * from users where id = $1";
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

  const newUser = {
    name: data.name,
    email: data.email,
    password: data.password,
  };

  try {
    const queryEmail = "select * from users where email = $1";
    const paramsEmail = [newUser.email];
    const emailFound = await pool.query(queryEmail, paramsEmail);

    if (emailFound.rowCount > 0) {
      return res.status(400).send({ message: "User already exists" });
    }

    const query =
      "insert into users (name, email, password) values ($1, $2, $3)";
    const params = [newUser.name, newUser.email, newUser.password];
    const result = await pool.query(query, params);

    if (result.rowCount === 0) {
      return res.status(400).send({ message: "User not created" });
    }

    res.status(201).send(newUser);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const userUpdate = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const query = "select * from users where id = $1";
    const params = [Number(id)];
    const userFound = await pool.query(query, params);

    if (userFound.rowCount === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    const queryEmail = "select * from users where email = $1";
    const paramsEmail = [email];
    const emailFound = await pool.query(queryEmail, paramsEmail);

    if (emailFound.rowCount > 0) {
      return res.status(400).send({ message: "User already exists" });
    }

    const queryUpdate =
      "update users set name = $1, email = $2, password = $3 where id = $4";
    const paramsUpdate = [name, email, password, Number(id)];

    const result = await pool.query(queryUpdate, paramsUpdate);

    if (result.rowCount === 0) {
      return res.status(400).send({ message: "User not updated" });
    }

    res.status(200).json({ message: "User updated!" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const userDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const query = "delete from users where id = $1";
    const params = [Number(id)];

    const result = await pool.query(query, params);

    if (result.rowCount === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted!" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  usersList,
  userGet,
  userCreate,
  userUpdate,
  userDelete,
};
