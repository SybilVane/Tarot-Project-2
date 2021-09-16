const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn, checkRoles } = require('./../middleware')


router.get('/', (req, res, next) =>res.render('user/admin'))

router.get('/user-list', (req,res) =>{

    User
    .find()
    .then((user) => res.render('user/user-list',{user}))
    .catch(err => console.log(err))
}) 

//User Delete
router.post('/user-list',isLoggedIn, checkRoles('ADMIN'), (req,res) => {
    
    const {id} = req.params

    User
    .findByIdAndDelete(id)
    .then(() =>res.redirect('/'))
    .catch(err => console.log(err))
} )

module.exports = router;