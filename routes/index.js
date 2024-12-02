const express = require('express');
const router = express.Router();
const utilities = require('../utilities/index')
const passport = require('passport');

// swagger route
router
    .use('/', require('./swagger'))

// classes route
router.use('/classes', require('./classes'));

// students route
router.use('/students', require('./students'));

// login 
router.get('/login', passport.authenticate('github'), (req, res) => {
    //#swagger.tags=['Login']
});

router.get('/logout', function(req, res, next) {
    //#swagger.tags=['Logout']
    req.logout(function(err) {
        if (err) { return next(err); }
        console.log('out?')
        res.redirect('/');
    });
});

// default
router.get('/', (req, res, next) => {
    //#swagger.tags=['Hello World']
    res.send('Hello');
}); 


module.exports = router; 