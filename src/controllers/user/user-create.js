const pool = require("../../connection");

const userCreate = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const query =
      "insert into users (name, email, password) values ($1, $2, $3) returning *";
    const params = [name, email, password];

    const user = await pool.query(query, params);

    if (user.rowCount === 0) {
      return res.status(404).json({ message: "User not created" });
    }

    return res.status(201).send(user.rows[0]);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  userCreate,
};
