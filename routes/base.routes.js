const router = require('express').Router();

const transporter = require('../config/mailing.config');

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

module.exports = router;
