const router = require('express').Router();
const Forum = require("../models/Forum.model")
const Card = require('./../models/Card.model');
const transporter = require('../config/mailing.config');
const { find } = require('../models/Forum.model');
const { isLoggedIn, checkRoles } = require('./../middleware')
const { isADMIN, isLogged} = require('./../utils')

//Day Card
router.get('/', (req, res, next) => {

 
  Card
  .find()
  .then(cards => {
    let card = cards[Math.floor(Math.random()* cards.length)]
    let position = Math.round(Math.random())
    res.render('index', {card, position})})
  .catch(err => console.error(err));
});

router.get('/contact-us', (req, res, next) => res.render('contact-us'));

router.post('/contact-us', (req, res, next) => {
  const { from, subject, text, username } = req.body;

  transporter
    .sendMail({
      from,
      to: 'tarotproject2@gmail.com',
      subject,
      text,
      html: `from ${username}: <b>${text}</b>`,
    })
    .then(res.redirect('/'))
    .catch(error => console.log(error));
});

//Forum
router.get('/forum', isLoggedIn, checkRoles('ADMIN', 'USER'), (req,res) => {
  
  const { page = 1, limit = 10 } = req.query;
console.log(page);
  Forum
  .find()
  .sort({date:-1})
  .skip((page -1) * limit)
  .limit(limit)
  .populate('user_id')
  .then(forum => res.render('forum/forum', {forum ,isADMIN: isADMIN(req.session.currentUser?.role), isLogged: isLogged(req.session.currentUser)}))
  .catch(error => console.log(error));
})
router.post('/forum', (req,res) =>{
  const {message} = req.body
  
  Forum
  .create({message, user_id: req.session.currentUser._id})
  .then(() => res.redirect('/forum'))
  .catch(error => console.log(error));
})

router.post('/forum/:id/delete',isLoggedIn, checkRoles('ADMIN'), (req,res) =>{
  const {id} = req.params
  
  Forum
  .findByIdAndDelete(id)
  .then(() => res.redirect('/forum'))
  .catch(error => console.log(error));
})

module.exports = router;
