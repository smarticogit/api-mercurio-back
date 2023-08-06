const pool = require("../connection");

const usersList = async (_, res) => {
  try {
    const usersList = await pool.query("select * from users");
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
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).send(userFound.rows[0]);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const userCreate = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields must be filled" });
    }

    const queryEmailExists = "select * from users where email = $1";
    const paramsEmailExists = [email];

    const emailAlreadyExists = await pool.query(
      queryEmailExists,
      paramsEmailExists
    );

    if (emailAlreadyExists.rowCount > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const query =
      "insert into users (name, email, password) values ($1, $2, $3) returning *";
    const params = [name, email, password];

    const user = await pool.query(query, params);

    if (user.rowCount === 0) {
      return res.status(404).json({ message: "User not created" });
    }

    res.status(201).send(user.rows[0]);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const userUpdate = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields must be filled" });
    }

    const queryEmailExists = "select * from users where email = $1";
    const paramsEmailExists = [email];

    const emailAlreadyExists = await pool.query(
      queryEmailExists,
      paramsEmailExists
    );

    if (emailAlreadyExists.rowCount > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const query =
      "update users set name = $1, email = $2, password = $3 where id = $4 returning *";
    const params = [name, email, password, Number(id)];

    const userUpdated = await pool.query(query, params);

    if (userUpdated.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).send(userUpdated.rows[0]);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const userDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const query = "delete from users where id = $1 returning *";
    const params = [Number(id)];
    const userDeleted = await pool.query(query, params);

    if (userDeleted.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).send(userDeleted.rows[0]);
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
