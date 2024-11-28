const express = require('express');
const router = express.Router();
const utilities = require('../utilities/index')
const classesController = require('../controllers/classes');
const validator = require('../utilities/validation')
const { isAuthenticated } = require('../utilities/authenticate')

router.get('/', utilities.handleErrors(classesController.getAllClasses));

router.get('/:id', utilities.handleErrors(classesController.getClass));

router.post('/',
    validator.classValidationRules(),
    isAuthenticated,
    validator.checkValidation,  
    utilities.handleErrors(classesController.createClass)
);

router.put('/:id',
    validator.classValidationRules(),
    isAuthenticated,
    validator.checkValidation, 
    utilities.handleErrors(classesController.updateClass)
);

router.delete('/:id', 
    isAuthenticated, 
    utilities.handleErrors(classesController.deleteClass)
);


module.exports = router; 