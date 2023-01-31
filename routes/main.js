
const router = require('express').Router()
const mainController = require('../controllers/main')
const setupController = require('../controllers/signup')
const postsController = require('../controllers/profile')
const loginController = require('../controllers/login')
const logoutController = require('../controllers/logout')
const { ensureAuth } = require("../middleware/auth");



// main routes
router.get('/', mainController.getMain)
router.get("/profile",ensureAuth, postsController.getProfile);

// login logout routes
router.get('/signup', setupController.getSignup)
router.post('/signup', setupController.postSignup)
router.get('/login', loginController.getLogin)
router.post('/login', loginController.postLogin)
router.get('/logout', logoutController.logout)



module.exports = router