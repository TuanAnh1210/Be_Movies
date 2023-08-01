import Joi from "joi";

export const movieSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Trường {#label} không được để trống",
    "any.required": "Trường {#label} là bắt buộc",
  }),
  genres: Joi.string().required().messages({
    "string.empty": "Trường {#label} không được để trống",
    "any.required": "Trường {#label} là bắt buộc",
  }),
  casts: Joi.array().min(1).required().messages({
    "string.empty": "Trường {#label} không được để trống",
    "any.required": "Trường {#label} là bắt buộc",
  }),
  year: Joi.number().integer().required().messages({
    "number.empty": "Trường {#label} không được để trống",
    "any.required": "Trường {#label} là bắt buộc",
  }),
});

export const updateMovieSchema = Joi.object({
  title: Joi.string(),
  genres: Joi.string(),
  casts: Joi.array(),
  year: Joi.number().integer(),
});
