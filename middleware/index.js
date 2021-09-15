const mongoose = require("mongoose")

// Custom middleware
module.exports = {
    isLoggedIn: (req, res, next) => {
        req.session.currentUser ? next() : res.render('auth/log-in', { errorMsg: 'Log In to continue' })
    },
    checkId: (req, res, next) => {
        mongoose.Types.ObjectId.isValid(req.params.id) ? next() : res.redirect('/')
    },
    checkRoles: (...roles) => (req, res, next) => {
        roles.includes(req.session.currentUser.role) ? next() : res.render('auth/log-in', { errorMsg: 'Not authorized' })
    }
}