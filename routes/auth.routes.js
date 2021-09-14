const router = require('express').Router();
const { default: axios } = require('axios');
const bcrypt = require('bcrypt');
const User = require('../models/User.model');
const { CDNupload } = require('../config/upload.config');

//Sign up
router.get('/signup', (req, res) => {
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => res.render('auth/sign-up', { countries: response.data }))
    .catch(err => printError(err));
});

router.post('/signup', CDNupload.single('avatar'), (req, res) => {
  const { username, userPwd, firstName, lastName, email, age, country } =
    req.body;

  if (userPwd.length === 0 || username.length === 0) {
    res.render('auth/sign-up', { errorMsg: 'Password is mandatory' });
    return;
  }

  User.findOne({ username })
    .then(user => {
      if (user) {
        res.render('auth/sign-up', { errorMsg: 'Username already exist' });
        return;
      }

      const bcryptSalt = 10;
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(userPwd, salt);

      User.create({
        username,
        password: hashPass,
        firstName,
        lastName,
        email,
        age,
        country,
        avatar: req.file?.path,
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

//Log in
router.get('/login', (req, res) => res.render('auth/login'));

router.post('/login', (req, res) => {
  const { username, userPwd } = req.body;

  if (userPwd.length === 0 || username.length === 0) {
    res.render('auth/log-in', { errorMsg: 'All fields must be completed' });
    return;
  }

  User.findOne({ username })
    .then(user => {
      if (!user) {
        res.render('auth/log-in', { errorMsg: 'Username not found' });
        return;
      }

      if (bcrypt.compareSync(userPwd, user.password) === false) {
        res.render('auth/log-in', { errorMsg: 'Incorrect Password' });
        return;
      }

      req.session.currentUser = user;

      res.redirect(`/user/profile/${user.id}`);
    })
    .catch(err => console.log(err));
});

module.exports = router;
