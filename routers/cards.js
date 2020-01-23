const router = require('express').Router();
const getCards = require('./cards-logics');

router.get('/', (req, res) => {
  getCards(res);
});

module.exports = router;
