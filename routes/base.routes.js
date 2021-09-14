const router = require('express').Router();
const Forum = require("../models/Forum.model")

const transporter = require('../config/mailing.config');
const { find } = require('../models/Forum.model');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
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
router.get('/forum', (req,res) => {
  

  Forum
  .find()
  .populate('user_id')
  .then(forum => res.render('forum/forum', {forum}))
  .catch(error => console.log(error));
})
router.post('/forum', (req,res) =>{
  const {message} = req.body
  
  Forum
  .create({message, user_id: req.session.currentUser._id})
  .then(() => res.redirect('/forum'))
  .catch(error => console.log(error));
})

module.exports = router;
