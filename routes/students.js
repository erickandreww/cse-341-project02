const express = require('express');
const router = express.Router();
const utilities = require('../utilities/index')
const studentsController = require('../controllers/students');
const validator = require('../utilities/validation')
const { isAuthenticated } = require('../utilities/authenticate')

router.get('/', utilities.handleErrors(studentsController.getAllStudents));

router.get('/:id', utilities.handleErrors(studentsController.getStudentById));

router.post('/', 
    validator.studentValidationRules(),
    isAuthenticated,
    validator.checkValidation, 
    utilities.handleErrors(studentsController.addStudent)
);

router.put('/:id',
    validator.studentValidationRules(),
    isAuthenticated,
    validator.checkValidation,  
    utilities.handleErrors(studentsController.updateStudent)
); 

router.delete('/:id', 
    isAuthenticated, 
    utilities.handleErrors(studentsController.deleteStudent));


module.exports = router;