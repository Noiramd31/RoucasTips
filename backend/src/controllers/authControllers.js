const models = require("../models");

const { verifyPassword } = require("../services/argonHelper");
const { encodeJWT } = require("../services/jwtHelper");
const validateLogin = require("../validator/loginValidator");

const login = (req, res) => {
  // Validation des données de connexion
  const errors = validateLogin(req.body);
  if (errors) {
    return res.status(401).send(errors);
  }

  // Recherche de l'utilisateur par e-mail
  return models.user
    .findByEmail(req.body.email)
    .then(([user]) => {
      if (!user) {
        return res.status(401).send("Invalid Credentials");
      }
      // console.log(req.body.password, user[0].password);
      // Vérification du mot de passe
      return verifyPassword(req.body.password, user[0].password)
        .then((passwordVerification) => {
          if (!passwordVerification) {
            return res.status(401).send("Invalid Credentials");
          }

          // Suppression du mot de passe de l'objet utilisateur
          const userWithoutPassword = { ...user };
          delete userWithoutPassword.password;

          // Encodage du JWT et envoi dans un cookie
          const token = encodeJWT(userWithoutPassword);
          res.cookie("auth.token", token, { httpOnly: true, secure: false });
          return res.status(200).json({ user: userWithoutPassword.name });
        })
        .catch((err) => {
          console.info(err);
          return res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.info(err);
      return res.sendStatus(500);
    });
};

const logout = (req, res) => {
  // Suppression du cookie et envoi du statut 200
  res.clearCookie("auth.token").sendStatus(200);
};

module.exports = { login, logout };
