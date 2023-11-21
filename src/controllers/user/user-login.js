const pool = require("../../connection");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await pool.query("select * from users where email = $1", [
      email,
    ]);

    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    const verifyPassword = await bcrypt.compare(
      password,
      userFound.rows[0].password
    );

    if (!verifyPassword) {
      return res.status(401).json({ message: "Email or password invalid" });
    }

    return res.status(200).json({ message: "Login successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  login,
};
