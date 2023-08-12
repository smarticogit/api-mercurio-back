const pool = require("../../connection");
const { emailValidator } = require("../../utils/emailValidator");
const userUpdate = async (req, res) => {
  const { id } = req.params;
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
      "update users set name = $1, email = $2, password = $3 where id = $4 returning *";
    const params = [name, email, password, Number(id)];

    const userUpdated = await pool.query(query, params);

    if (userUpdated.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).send(userUpdated.rows[0]);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { userUpdate };
