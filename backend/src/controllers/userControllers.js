const fs = require("fs");

const models = require("../models");

const validateUser = require("../validator/userValidator");
const { hashPassword } = require("../services/argonHelper");

const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.user
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const user = req.body;
  user.id = parseInt(req.params.id, 10);
  const { originalname } = req.file;
  const { filename } = req.file;
  if (!req.file) {
    res.status(400).send("Aucun fichier n'a été envoyé");
    return;
  }
  user.avatar = `/public/uploads/${originalname}`;

  fs.rename(
    `./public/uploads/${filename}`,
    `./public/uploads/${originalname}`,
    async (renameErr) => {
      if (renameErr) {
        console.error(renameErr);
        res.sendStatus(500);
      } else {
        const errors = validateUser(req.body);
        if (errors) {
          return res.status(401).send(errors);
        }
        const hashedPassword = await hashPassword(req.body.password);
        models.user
          .update({ ...req.body, password: hashedPassword })
          .then(([result]) => {
            if (result.affectedRows === 0) {
              res.sendStatus(404);
            } else {
              res.sendStatus(204);
            }
          })
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          });
      }
      return null; // Add this line at the end of the async arrow function
    }
  );
};

const add = (req, res) => {
  const user = req.body;
  const { originalname } = req.file;
  const { filename } = req.file;
  if (!req.file) {
    res.status(400).send("Aucun fichier n'a été envoyé");
    return;
  }
  user.avatar = `/public/uploads/${originalname}`;

  fs.rename(
    `./public/uploads/${filename}`,
    `./public/uploads/${originalname}`,
    async (renameErr) => {
      if (renameErr) {
        console.error(renameErr);
        res.sendStatus(500);
      } else {
        const errors = validateUser(req.body);
        if (errors) {
          return res.status(401).send(errors);
        }
        const hashedPassword = await hashPassword(req.body.password);

        models.user
          .insert({ ...req.body, password: hashedPassword })
          .then(([result]) => {
            res.location(`/user/${result.insertId}`).sendStatus(201);
          })
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          });
      }
      return null; // Add this line at the end of the async arrow function
    }
  );
};
const destroy = (req, res) => {
  models.user
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
