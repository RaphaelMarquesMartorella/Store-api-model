const Company = require("../model/company");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { CNPJ, password, company } = req.body;
  try {
    const existingCompany = await Company.findOne({ CNPJ });
    if (existingCompany) {
      return res
        .json({ error: "This CNPJ has already been registered." })
        .status(404);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const register = new Company({
      CNPJ,
      password: hashedPassword,
      company,
    });
    await register.save();
    res.json({ message: "company was registered" }).status(201);
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { CNPJ, password } = req.body;
  try {
    const registeredCompany = await Company.findOne({ CNPJ });
    if (!registeredCompany) {
      return res.json({ error: "This CNPJ is not registered" }).status(404);
    }

    const validPassword = await bcrypt.compare(
      password,
      registeredCompany.password
    );
    if (!validPassword) {
      return res.json({ error: "Password not Valid." }).status(404);
    }
    const token = await jwt.sign(
      { id: registeredCompany._id },
      process.env.SECRET
    );

    res.json({ token, message: "Login was successfull." });
  } catch (error) {
    console.log(error);
    res.json({ error }).status(500);
  }
};

module.exports = {
  register,
  login,
};
