const router = require('express').Router();
const { getUsersList, getUserById } = require('./users-logics');

router.get('/', (req, res) => {
  getUsersList(res);
});

router.get('/:id', (req, res) => {
  getUserById(req, res);
});

module.exports = router;
