const { emailValidator } = require("../utils/emailValidator");
const validator = async (req, res, next) => {
  if (req.body && Object.keys(req.body).length > 0) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields must be filled" });
    }

    if (name.length < 3) {
      return res
        .status(400)
        .json({ message: "Name must be at least 3 characters" });
    }

    const result = await emailValidator(email);

    if (result.rowCount > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    next();
  } else {
    next();
  }
};

module.exports = { validator };
