const argon2 = require("argon2");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCoast: 5,
  parallelism: 1,
};

// plainPassword c'est le mot de passe comme il a été envoyé du front
// permet de hasher le password
const hashPassword = (plainPassword) => {
  return argon2.hash(plainPassword, hashingOptions);
};

// permet de verifier que le password correspond dans la bdd
const verifyPassword = (plainPassword, hashPasswords) => {
  return argon2.verify(hashPasswords, plainPassword, hashingOptions);
};

module.exports = { hashPassword, verifyPassword };
