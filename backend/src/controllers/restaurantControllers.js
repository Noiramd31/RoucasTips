// const Joi = require("joi");
const fs = require("fs");

const models = require("../models");

const browse = (req, res) => {
  models.restaurant
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
  models.restaurant
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
  const restaurant = req.body;
  restaurant.id = parseInt(req.params.id, 10);
  const { originalname } = req.file;
  const { filename } = req.file;
  if (!req.file) {
    res.status(400).send("Aucun fichier n'a été envoyé");
    return;
  }
  restaurant.picture = `/public/uploads/${originalname}`;

  fs.rename(
    `./public/uploads/${filename}`,
    `./public/uploads/${originalname}`,
    (renameErr) => {
      if (renameErr) {
        console.error(renameErr);
        res.sendStatus(500);
      } else {
        models.restaurant
          .update(restaurant)
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
  const restaurant = req.body;
  const { originalname } = req.file;
  const { filename } = req.file;
  if (!req.file) {
    res.status(400).send("Aucun fichier n'a été envoyé");
    return;
  }
  restaurant.picture = `/public/uploads/${originalname}`;
  restaurant.id = parseInt(req.params.id, 10);

  fs.rename(
    `./public/uploads/${filename}`,
    `./public/uploads/${originalname}`,
    (renameErr) => {
      if (renameErr) {
        console.error(renameErr);
        res.sendStatus(500);
      } else {
        models.restaurant
          .insert(restaurant)
          .then(([result]) => {
            res.location(`/restaurant/${result.insertId}`).sendStatus(201);
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
  models.restaurant
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
