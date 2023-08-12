const teste = async (req, res, next) => {
  console.log("testando");

  console.log(req.body);

  next();
};

module.exports = { teste };
