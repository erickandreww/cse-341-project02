const express = require('express');
const router = express.Router();
const classesController = require('../controllers/classes');
const validator = require('../utilities/validation')
const utilities = require('../utilities/index');
const { isAuthenticated } = require('../utilities/authenticate')

router.get('/', 
    utilities.handleErrors(classesController.getAllClasses));

router.get('/:id', 
    utilities.handleErrors(classesController.getClass));

router.get('/:id/students', 
    utilities.handleErrors(classesController.getClassStudents));

router.post('/',
    isAuthenticated,
    validator.classValidationRules(),
    validator.checkValidation,  
    utilities.handleErrors(classesController.createClass)
);

router.put('/:id',
    isAuthenticated,
    validator.classValidationRules(),
    validator.checkValidation, 
    utilities.handleErrors(classesController.updateClass)
);

router.delete('/:id', 
    isAuthenticated, 
    utilities.handleErrors(classesController.deleteClass)
);


module.exports = router; 