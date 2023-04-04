// const Joi = require("joi");
const fs = require("fs");

const models = require("../models");

const browse = (req, res) => {
  models.city
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
  models.city
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
  const city = req.body;
  city.id = parseInt(req.params.id, 10);
  const { originalname } = req.file;
  const { filename } = req.file;
  if (!req.file) {
    res.status(400).send("Aucun fichier n'a été envoyé");
    return;
  }
  city.picture = `/public/uploads/${originalname}`;

  fs.rename(
    `./public/uploads/${filename}`,
    `./public/uploads/${originalname}`,
    (renameErr) => {
      if (renameErr) {
        console.error(renameErr);
        res.sendStatus(500);
      } else {
        models.city
          .update(city)
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
    }
  );
};

const add = (req, res) => {
  const city = req.body;
  const { originalname } = req.file;
  const { filename } = req.file;
  if (!req.file) {
    res.status(400).send("Aucun fichier n'a été envoyé");
    return;
  }
  city.picture = `/public/uploads/${originalname}`;
  city.id = parseInt(req.params.id, 10);

  fs.rename(
    `./public/uploads/${filename}`,
    `./public/uploads/${originalname}`,
    (renameErr) => {
      if (renameErr) {
        console.error(renameErr);
        res.sendStatus(500);
      } else {
        models.city
          .insert(city)
          .then(([result]) => {
            res.location(`/city/${result.insertId}`).sendStatus(201);
          })
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          });
      }
    }
  );
};

const destroy = (req, res) => {
  models.city
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
