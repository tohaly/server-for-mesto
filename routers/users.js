const router = require('express').Router();
const { getUsers, getUserById, updateProfile, updateAvatar } = require('../controllers/users');
const { doesUserExist } = require('../middlewares/doesUserExist');
const {
  validateUpdateProfile,
  validateUpdateAvatar
} = require('../middlewares/request-validation');

router.get('/', getUsers);
router.get('/:userId', doesUserExist, getUserById);
router.patch('/me', validateUpdateProfile, updateProfile);
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
