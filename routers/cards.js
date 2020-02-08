const router = require('express').Router();
const { getCards, createCard, deleteCardById, toLike } = require('../controllers/cards');
const { doesCardExist } = require('../middlewares/doesCardExist');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', doesCardExist, deleteCardById);
router.put('/:cardId/likes', doesCardExist, toLike);
router.delete('/:cardId/likes', doesCardExist, toLike);

module.exports = router;
