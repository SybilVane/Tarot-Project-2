const router = require('express').Router();
const { default: axios } = require('axios');
const User = require('../models/User.model');
const History = require('./../models/History.model');
const { CDNupload } = require('../config/upload.config');
const { isLoggedIn, checkRoles } = require('./../middleware');

//User Profile
router.get(
  '/profile/:id',
  isLoggedIn,
  checkRoles('ADMIN', 'USER'),
  (req, res) => {
    const { id } = req.params;

    History.find({ user_id: id })
      .limit(10)
      .populate('user_id cards_id')
      .then(history => {
        res.render('user/profile', { history, id });
      })
      .catch(err => console.log(err));
  }
);

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

//User Delete
router.post(
  '/profile/:id/delete',
  isLoggedIn,
  checkRoles('ADMIN'),
  (req, res) => {
    const { id } = req.params;

    User.findByIdAndDelete(id)
      .then(() => res.redirect('/'))
      .catch(err => console.log(err));
  }
);

module.exports = router;
