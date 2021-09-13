const router = require("express").Router()

const User = require("../models/User.model")

//User Profile
router.get('/profile/:id',  (req, res) => {
    
    const {id} = req.params

    User
    .findById(id)
    .then(() => {
        res.render('user/profile')
    })
    .catch(err => console.log(err))
})


module.exports = router;