const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar
} = require('../controllers/users');
const { doesUserExist } = require('./doesUserExist');

router.get('/', getUsers);
router.get('/:userId', doesUserExist);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
