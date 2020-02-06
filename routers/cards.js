const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard
} = require('../controllers/cards');
const { doesCardExist } = require('./doesCardExist');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', doesCardExist);
router.delete('/:cardId', deleteCardById);
router.put('/:cardId/likes', doesCardExist);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', doesCardExist);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
