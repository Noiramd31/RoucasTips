const { decodeJWT } = require("../services/jwtHelper");

const authorization = async (req, res, next) => {
  try {
    const token = req.cookies["auth.token"];
    console.info(token);
    if (!token) throw new Error();

    const data = decodeJWT(token);

    req.userId = data.id;
    req.userName = data.name;

    return next();
  } catch (err) {
    console.error(err);
    return res.sendStatus(401);
  }
};

module.exports = authorization;
