const router = require("express").Router()
const User = require("../models/User.model")
const Card = require('./../models/Card.model');
const { isLoggedIn, checkRoles } = require('./../middleware')


router.get('/', (req, res, next) =>res.render('user/admin'))

//Users List
router.get('/user-list', (req,res) =>{

    User
    .find()
    .then((user) => res.render('user/user-list',{user}))
    .catch(err => console.log(err))
}) 

//User Delete
router.post('/user-list/:id/delete',isLoggedIn, checkRoles('ADMIN'), (req,res) => {
    
    const {id} = req.params

    User
    .findByIdAndDelete(id)
    .then(() =>res.redirect('/admin'))
    .catch(err => console.log(err))
} )

//Cards List
router.get('/cards-list', (req,res) =>{

    Card
    .find()
    .sort({ number: 1 })
    .then((cards) => res.render('cards/cards-list',{cards}))
    .catch(err => console.log(err))
}) 

module.exports = router;