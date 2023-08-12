const pool = require("../../connection");
const { emailValidator } = require("../../utils/emailValidator");

const userCreate = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields must be filled" });
    }

    const result = await emailValidator(email);

    if (result.rowCount > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

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
