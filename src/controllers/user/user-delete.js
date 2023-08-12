const pool = require("../../connection");

const userDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const query = "delete from users where id = $1 returning *";
    const params = [Number(id)];
    const userDeleted = await pool.query(query, params);

    if (userDeleted.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).send(userDeleted.rows[0]);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  userDelete,
};
