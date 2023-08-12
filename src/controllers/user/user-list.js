const pool = require("../../connection");

const usersList = async (_, res) => {
  try {
    const usersList = await pool.query("select * from users");

    return res.status(200).send(usersList.rows);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { usersList };
