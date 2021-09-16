const router = require('express').Router();
const { default: axios } = require('axios');
const User = require('../models/User.model');
const History = require('./../models/History.model');
const { CDNupload } = require('../config/upload.config');
const { isLoggedIn, checkRoles } = require('./../middleware');
const { isADMIN, isLogged } = require('./../utils');

//User Profile
router.get('/profile', isLoggedIn, checkRoles('ADMIN', 'USER'), (req, res) => {
  const id = req.session.currentUser._id;

  History.find({ user_id: id })
    .limit(10)
    .populate('user_id cards_id')
    .then(history => {
      res.render('user/profile', {
        user: req.session.currentUser,
        history,
        id,
        isADMIN: isADMIN(req.session.currentUser?.role),
        isLogged: isLogged(req.session.currentUser),
      });
    })
    .catch(err => console.log(err));
});

//User Profile Edit
router.get(
  '/profile/:id/edit',
  isLoggedIn,
  checkRoles('ADMIN', 'USER'),
  (req, res) => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response =>
        res.render('user/profile-edit', {
          countries: response.data,
          id: req.params.id,
        })
      )
      .catch(err => printError(err));
  }
);

router.post('/profile/:id/edit', CDNupload.single('avatar'), (req, res) => {
  const { id } = req.params;
  const { email, country, age } = req.body;

  console.log(req.file, '----------------');

  const query = {};

  email && (query.email = email);
  req.file && (query.avatar = req.file?.path);
  country && (query.country = country);
  age && (query.age = age);

  console.log(query);

  User.findByIdAndUpdate(id, query, { new: true })
    .then(user => {
      res.redirect(`/user/profile/${id}`);
    })
    .catch(err => console.log(err));
});


module.exports = router;
