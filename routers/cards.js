const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard
} = require('../controllers/cards');
const { doesCardExist } = require('../middlewares/doesCardExist');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', doesCardExist, deleteCardById);
router.put('/:cardId/likes', doesCardExist, likeCard);
router.delete('/:cardId/likes', doesCardExist, dislikeCard);

module.exports = router;
