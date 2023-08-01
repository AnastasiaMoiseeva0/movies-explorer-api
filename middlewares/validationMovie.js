const { celebrate, Joi } = require('celebrate');

const linkRegexp = /http[s]?:\/\/(?:[-\w]+\.)+[/\w-.~:?#[\]@!$&'()*+,;=]+/;

const validationCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(linkRegexp),
    trailerLink: Joi.string().required().regex(linkRegexp),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().regex(linkRegexp),
    movieId: Joi.number().required(),
  }),
});

const validationMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  validationCreateMovie,
  validationMovieId,
};
