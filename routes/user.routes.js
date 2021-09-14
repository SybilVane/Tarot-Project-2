const router = require("express").Router()
const { default: axios } = require("axios")
const User = require("../models/User.model")

//User Profile
router.get('/profile/:id',  (req, res) => {
    
    const {id} = req.params

    User
    .findById(id)
    .select('username avatar history')
    .then((user) => {res.render('user/profile',user) })
    .catch(err => console.log(err))
})


//User Profile Edit
router.get('/profile/:id/edit', (req, res) =>{
    
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => res.render('user/profile-edit', {countries: response.data}))
    .catch(err => printError(err))
})

router.post('/profile/:id/edit', (req, res) =>{
    const { id } = req.params
    const { email, avatar, country, age } = req.body

    User
    .findByIdAndUpdate(id, { email, avatar, country, age }, { new: true })
    .then((user) => {res.render('user/profile',user) })
    .catch(err => console.log(err))
})

//User Delete
router.post('/profile/:id/delete', (req,res) => {
    
    const {id} = req.params
console.log(id);
    User
    .findByIdAndDelete(id)
    .then(() =>res.redirect('/'))
    .catch(err => console.log(err))
} )


module.exports = router;
