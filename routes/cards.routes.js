const router = require('express').Router();
const Card = require('./../models/Card.model');
const { CDNupload } = require('../config/upload.config');

router.get('/database', (req, res, next) => {
  Card.find()
    .sort({ number: 1 })
    .then(cards => {
      res.render('cards/cards-database', { cards });
    })
    .catch(err => console.log(err));
});

router.get('/details/:cardId', (req, res, next) => {
  Card.findById(req.params.cardId)
    .then(card => res.render('cards/card-details', card))
    .catch(err => console.error(err));
});

router.get('/details/edit/:cardId/', (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then(card => res.render('cards/edit-card', card))
    .catch(err => console.log(err));
});

router.post(
  '/details/edit/:cardId/',
  CDNupload.array('image'),
  (req, res, next) => {
    const { cardId } = req.params;
    const {
      uprightKeywords,
      reverseKeywords,
      uprightFullDescription,
      reverseFullDescription,
    } = req.body;

    Card.findByIdAndUpdate(cardId, {
      uprightImage: req.files[0]?.path,
      reverseImage: req.files[1]?.path,
      uprightKeywords,
      reverseKeywords,
      uprightFullDescription,
      reverseFullDescription,
    })
      .then(card => res.redirect(`/cards/details/${cardId}`))
      .catch(err => console.log(err));
  }
);


module.exports = router;
