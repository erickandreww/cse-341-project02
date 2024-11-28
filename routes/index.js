const express = require('express');
const router = express.Router();
const passport = require('passport');

// swagger route
router.use('/', require('./swagger'))

// classes route
router.use('/classes', require('./classes'));

// students route
router.use('/students', require('./students'));

// login 
router.get('/login', passport.authenticate('github', (req, res) => {}));

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) {
            console.log('no out');
            return next(err); }
        console.log('out?');
        res.redirect('/');
    })
})

// default
router.get('/', (req, res, next) => {
    //#swagger.tags=['Hello World']
    res.send('Hello');
}); 


module.exports = router; 