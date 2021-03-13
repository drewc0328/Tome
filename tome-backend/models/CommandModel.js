const Joi = require("joi");

const CommandSchema = Joi.object({
  uid: Joi.number().required(),
  title: Joi.string().required(),
  body: Joi.string().required(),
  tag: Joi.string().alphanum().required(),
});

module.exports = CommandSchema;
