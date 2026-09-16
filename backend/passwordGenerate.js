const bcrypt = require("bcrypt");

const generatePassword = async () => {
  const hashPassword = await bcrypt.hash(process.env.PASSWORD, 10);
  console.log(hashPassword);
};

generatePassword();
