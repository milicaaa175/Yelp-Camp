const express = require('express');
const users = require('../controllers/users');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');

const router = express.Router();

router.route('/register')
    .get(users.renderRegisterForm)
    .post(users.register);

router.route('/login')
    .get(users.renderLoginForm)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

router.get('/logout', users.logout);

module.exports = router;