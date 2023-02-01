const router = require('express').Router();

const {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserById,
} = require('../../controllers/user-controller');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
