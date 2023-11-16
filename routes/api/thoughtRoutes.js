// Desc: This file contains all the routes for the thought model
// ================================================================

// importing thought controller methods
// ================================================================
const router = require('express').Router();
const {
  getAllThoughts,
  getSingleThought,
  createNewThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController');
// ================================================================

// /api/thoughts
// ================================================================
router
  .route('/')
  .get(getAllThoughts)
  .post(createNewThought);
// ================================================================

// /api/thoughts/:thoughtId
// ================================================================
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(removeThought);
// ================================================================

// /api/thoughts/:thoughtId/reactions
// ================================================================
router
  .route('/:thoughtId/reactions')
  .post(addReaction)
  // ================================================================
  
  // /api/thoughts/:thoughtId/reactions/:reactionId
  // ================================================================
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete (removeReaction);
// ================================================================

// exporting router
// ================================================================
module.exports = router;
// ================================================================