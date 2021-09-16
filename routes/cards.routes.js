const router = require('express').Router();
const Card = require('./../models/Card.model');
const { CDNupload } = require('../config/upload.config');
const History = require('./../models/History.model');

router.get('/database', (req, res, next) => {
  Card.find()
    .select({ number: 1, name: 1, uprightImage: 1 })
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

//Reading Cards
router.get('/reading', (req, res, next) => {
  Card.find()
    .then(cards => {
      let card1 = cards[Math.floor(Math.random() * cards.length)];
      let card2 = cards[Math.floor(Math.random() * cards.length)];
      let card3 = cards[Math.floor(Math.random() * cards.length)];
      let positionA = Math.round(Math.random());
      let positionB = Math.round(Math.random());
      let positionC = Math.round(Math.random());

      if (card1 === card2) {
        cards[Math.floor(Math.random() * cards.length)];
      }
      if (card3 === card1 || card3 === card2) {
        cards[Math.floor(Math.random() * cards.length)];
      }

      History.create({
        cards_id: [card1._id, card2._id, card3._id],
        user_id: req.session.currentUser._id,
      })
        .then(() =>
          res.render('cards/cards-reading', {
            card1,
            card2,
            card3,
            positionA,
            positionB,
            positionC,
          })
        )
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
});

module.exports = router;
