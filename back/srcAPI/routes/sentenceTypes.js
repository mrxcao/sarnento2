const express = require('express');
const router = express.Router();

const sentenceTypesController = require('../controllers/sentenceTypesController');
const authMiddleware = require('../middlewares/authMiddleware');

// Privates
router.get('/', authMiddleware, sentenceTypesController.get);
router.post('/', authMiddleware, sentenceTypesController.set);
 
module.exports = router;

