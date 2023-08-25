const pool = require("../../connection");

const usersList = async (_, res) => {
  try {
    const usersList = await pool.query("select * from users");

    const { rows } = usersList;

    const users = rows.map((user) => {
      const { password: _, ...userData } = user;
      return userData;
    });

    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { usersList };
