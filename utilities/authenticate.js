const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {
        console.log(req.session.user);
        return res.status(401).json('You do not have access.');
    }
    next();
}

module.exports = { isAuthenticated };