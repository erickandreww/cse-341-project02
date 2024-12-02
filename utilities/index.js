const createError = require('http-errors'); 

const handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch((error) => {
    console.log(error.message)
    next(error);
});

module.exports = { handleErrors }