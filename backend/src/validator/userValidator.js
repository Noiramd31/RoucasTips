const Joi = require("joi");

const validateUser = (user) => {
  const schema = Joi.object({
    firstname: Joi.string().min(3).max(45).messages({
      "string.min": "Le prénom doit comporter au moins 3 caractères.",
      "string.max": "Le prénom ne doit pas dépasser 45 caractères.",
    }),
    lastname: Joi.string().min(3).max(45).messages({
      "string.min": "Le nom doit comporter au moins 3 caractères.",
      "string.max": "Le nom ne doit pas dépasser 45 caractères.",
    }),
    nickname: Joi.string().min(3).max(45).required().messages({
      "string.min": "Le pseudo doit comporter au moins 3 caractères.",
      "string.max": "Le pseudo ne doit pas dépasser 45 caractères.",
      "any.required": "Le pseudo est obligatoire.",
    }),
    avatar: Joi.string().custom((value, helper) => {
      const urlPattern = new RegExp(
        "^(https?:\\/\\/)?" +
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" +
          "((\\d{1,3}\\.){3}\\d{1,3}))" +
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
          "(\\?[;&a-z\\d%_.~+=-]*)?" +
          "(\\#[-a-z\\d_]*)?$",
        "i"
      );

      const localPathPattern =
        /^\/public\/uploads\/[-a-zA-Z0-9@:%._+~#=]{1,256}$/;

      if (!urlPattern.test(value) && !localPathPattern.test(value)) {
        return helper.message("Le chemin de l'avatar n'est pas valide.");
      }
      return true;
    }),

    email: Joi.string().email().required().messages({
      "string.email": "L'email doit être valide.",
      "any.required": "L'email est obligatoire.",
    }),
    password: Joi.string().min(8).max(30).required().messages({
      "string.min": "Le mot de passe doit comporter au moins 8 caractères.",
      "string.max": "Le mot de passe ne doit pas dépasser 30 caractères.",
      "any.required": "Le mot de passe est obligatoire.",
    }),
    role_adm: Joi.number().integer().min(0).max(1).default(0),
  });

  const options = {
    abortEarly: false,
  };

  const validationResult = schema.validate(user, options);

  if (validationResult.error) {
    const errorMessages = validationResult.error.details.map((error) => ({
      message: error.message,
    }));
    return { errorCount: validationResult.error.details.length, errorMessages };
  }
  return false;
};

module.exports = validateUser;
