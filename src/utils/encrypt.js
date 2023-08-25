const bcrypt = require("bcrypt");

const encrypt = async (password) => {
  return await bcrypt.hash(password, 13);
};

module.exports = {
  encrypt,
};
