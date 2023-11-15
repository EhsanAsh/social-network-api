// Desc: This file contains all the routes for the user model
// ================================================================

// importing user controller methods
// ================================================================
const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createNewUser,
  updateOneUser,
  deleteOneUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');
// ================================================================

// /api/users
// ================================================================
router
  .route('/')
  .get(getAllUsers)
  .post(createNewUser);
// ================================================================

// /api/users/:id
// ================================================================
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateOneUser)
  .delete(deleteOneUser);
// ================================================================

// /api/users/:userId/friends/:friendId
// ================================================================
router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);
// ================================================================

// exporting router
// ================================================================
module.exports = router;
// ================================================================