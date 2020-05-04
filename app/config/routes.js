const express = require('express');
const router = express.Router();

const assessmentController = require('../controllers/assessmentController');
const authController = require('../controllers/authController');
const usersController = require('../controllers/usersController');

const passportAuthMiddleware = require('../middleware/passportAuth')

router.route('/login')
  .get(authController.getLoginForm)
  .post(authController.login)

router.route('/register')
  .get(authController.getRegisterForm)
  .post(authController.register)

router.use(passportAuthMiddleware);

router.route('/')
  .get(assessmentController.getAssessmentForm)
  .post(assessmentController.sendAssessment)

router.route('/users')
  .get(usersController.getAll)

router.route('/success')
  .get(assessmentController.success)

router.route('/fail')
  .get(assessmentController.fail)

router.route('/logout')
  .get(authController.logout)


module.exports = router;
