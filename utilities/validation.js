const { body, validationResult } = require("express-validator"); 

const validate = {}

validate.studentValidationRules = () => {
    return [
        body("student_firstName")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide a first name."), 

        body("student_lastName")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 2 })
            .withMessage("Please provide a last name."),

        body("student_age")
            .trim()
            .isInt()
            .notEmpty()
            .isLength({ min: 1, max: 3 })
            .withMessage("Please provide a valide age."),

        body("student_gender")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 2 })
            .withMessage("Please provide a last name."),

        body("student_email")
            .trim()
            .isEmail()
            .normalizeEmail() // refer to validator.js docs
            .withMessage("A valid email is required."), 

        body("class_id")
            .trim()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide a valid Classification."),
    ]
}

validate.classValidationRules = () => {
    return [
        body("class_name")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide a Class."), 

        body("class_floor")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide a floor."),
    ]
}

validate.checkValidation = async (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = validate