const express = require('express');
const router = express.Router();

const controller = require('../controllers/sentencesController');
const authMiddleware = require('../middlewares/authMiddleware');

// Privates
router.get('/', authMiddleware, controller.get);
router.post('/', authMiddleware, controller.set);
 
module.exports = router;

