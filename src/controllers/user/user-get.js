const pool = require("../../connection");

const userGet = async (req, res) => {
  const { id } = req.params;

  try {
    const query = "select * from users where id = $1";
    const params = [Number(id)];

    const { rowCount, rows } = await pool.query(query, params);

    if (rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password: _, ...userData } = rows[0];

    return res.status(200).send(userData);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  userGet,
};
