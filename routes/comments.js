const express = require('express');

const router = express.Router();
const passport = require('passport');
const commentController = require('../controllers/comment_controller');

// the second thing passport.checkauthentication cehck if user is signed in or not
router.post('/create-comment/:id',passport.checkauthentication ,commentController.create);
router.get('/destroy/:id',passport.checkauthentication,commentController.destroy);

module.exports = router;