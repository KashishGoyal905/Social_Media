const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');
router.get('/profile/:id', usersController.profile);
router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);
router.get('/sign-out', usersController.signOut);
router.post('/update/:id', passport.checkauthentication, usersController.update);
router.post('/create-user', usersController.create);
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/sign-in' }
), usersController.createSession);



module.exports = router;