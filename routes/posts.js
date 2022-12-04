const express = require('express');
const router = express.Router();
const passport = require('passport');
const postController = require('../controllers/post_controller');
router.post('/create-post', passport.checkauthentication, postController.create);
router.get('/destroy/:id', passport.checkauthentication, postController.destroy);


module.exports = router;