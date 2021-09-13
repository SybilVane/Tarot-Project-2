const router = require("express").Router()
const bcrypt = require('bcrypt')
const User = require("../models/User.model")


//Sign up
router.get('/signup', (req, res) => res.render('auth/sign-up'))

const getCountryInfo = name => {
    axios
        .get('https://restcountries.eu/rest/v2/name')
        .then(response => printInfo(response.data))
        .catch(err => printError(name))
}

router.post('/signup', (req, res) => {

    const { username, userPwd, firstName, lastName, email, age, country } = req.body
  
    if (userPwd.length === 0 || username.length === 0) {       
      res.render('auth/sign-up', { errorMsg: 'Password is mandatory' })
      return
    }
  
    User
      .findOne({ username })
      .then(user => {
  
        if (user) {                   
          res.render('auth/sign-up', { errorMsg: 'Username already exist' })
          return
        }
  
        const bcryptSalt = 10
        const salt = bcrypt.genSaltSync(bcryptSalt)
        const hashPass = bcrypt.hashSync(userPwd, salt)     
  
        User
          .create({ username, password: hashPass,firstName, lastName, email, age, country })         
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
  
      })
      .catch(err => console.log(err))
})

//Log in
router.get('/login', (req, res) => res.render('auth/log-in'))

router.post('/login', (req, res) => {

   const { username, userPwd } = req.body

   if (userPwd.length === 0 || username.length === 0) {     
    res.render('auth/log-in', { errorMsg: 'Fill in the fields in blank' })
    return
   }

  User
    .findOne({ username })
    .then(user => {

    if (!user) {
       res.render('auth/log-in', { errorMsg: 'Unrecognized User' })
       return
        }

    if (bcrypt.compareSync(userPwd, user.password) === false) {
       res.render('auth/log-in', { errorMsg: 'Incorrect Password' })
       return
    }

    req.session.currentUser = user
    res.redirect(`/profile/${user.id}`)
})
    .catch(err => console.log(err))

})


module.exports = router