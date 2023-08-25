const pool = require("../../connection");
const { encrypt } = require("../../utils/encrypt");

const userCreate = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const encryptPassword = await encrypt(password);

    const query =
      "insert into users (name, email, password) values ($1, $2, $3) returning *";
    const params = [name, email, encryptPassword];

    const { rows } = await pool.query(query, params);
    const { password: _, ...userData } = rows[0];

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not created" });
    }

    return res.status(201).send(userData);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  userCreate,
};
