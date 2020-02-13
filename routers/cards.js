const router = require('express').Router();
const { getCards, createCard, deleteCardById, likeToggle } = require('../controllers/cards');
const { doesCardExist } = require('../middlewares/doesCardExist');
const { doesCardBelongUser } = require('../middlewares/doesCardBelongUser');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', doesCardExist, doesCardBelongUser, deleteCardById);
router.put('/:cardId/likes', doesCardExist, likeToggle);
router.delete('/:cardId/likes', doesCardExist, likeToggle);

module.exports = router;
