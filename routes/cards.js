var express = require('express');
var router = express.Router();
const { data } = require('../data/flashcard.json');
const { cards }  = data;
console.log(cards);
/* GET cards page. */
router.get('/', function(req, res) {
  const numberOfCards = cards.length;
  const flashcardId = Math.floor(Math.random() * numberOfCards);
  res.redirect(`/cards/${flashcardId}?side=question`);
});


/* GET card page. */
router.get('/:id', function(req, res) {
  const side = req.query.side;
  const id = req.params.id;

  if (!side) {
    return res.redirect(`/cards/${id}?side=question`);
  }
  const name = req.cookies.username;
  const text = cards[id][side];
  const hint = cards[id].hint;

  const templateData = {id, text, name,side};

  if (side === 'question') {
      templateData.hint = hint;
      templateData.sideToShow = 'answer';
      templateData.sideToDisplay = 'Answer'
  }else if (side === ' question') {
    templateData.sideToShow = 'question';
    templateData.sideToDisplay = 'Question';
  }
  res.render('card-front', templateData);
});

/* Remove cookie. */
router.get('/bye', function(req, res, next) {
  res.clearCookie("username");
  res.redirect('/hello');
});

module.exports = router;
