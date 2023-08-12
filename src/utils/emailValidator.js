const pool = require("../connection");

const emailValidator = async (email) => {
  const query = "select * from users where email = $1";
  const params = [email];

  return await pool.query(query, params);
};

module.exports = {
  emailValidator,
};
