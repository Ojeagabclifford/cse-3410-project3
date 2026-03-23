const validator = require('../helpers/validate');

const saveMovie = (req, res, next) => {
  const validationRule = {
    title: 'required|string|min:1|max:100',
    releaseYear: 'required|integer|min:1888|max:2030',
    genre: 'required|array',
    directorName: 'required|string',
    castNames: 'array',
    runtime: 'required|numeric|min:1',
    plotSummary: 'required|string|min:10|max:500'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveDirector = (req, res, next) => {
  const validationRule = {
    name: 'required|string|min:2',
    bio: 'required|string|min:5',
    nationality: 'required|string',
    awards: 'array'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = { saveMovie, saveDirector };