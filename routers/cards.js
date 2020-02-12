const router = require('express').Router();
const { getCards, createCard, deleteCardById, likeToggle } = require('../controllers/cards');
const { doesCardExist } = require('../middlewares/doesCardExist');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', doesCardExist, deleteCardById);
router.put('/:cardId/likes', doesCardExist, likeToggle);
router.delete('/:cardId/likes', doesCardExist, likeToggle);

module.exports = router;
