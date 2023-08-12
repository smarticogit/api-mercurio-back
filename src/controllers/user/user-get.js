const pool = require("../../connection");

const userGet = async (req, res) => {
  const { id } = req.params;

  try {
    const query = "select * from users where id = $1";
    const params = [Number(id)];

    const userFound = await pool.query(query, params);

    if (userFound.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).send(userFound.rows[0]);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  userGet,
};
