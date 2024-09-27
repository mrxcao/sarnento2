const express = require('express');
const router = express.Router();

const guildsController = require('../controllers/guildsController');
const authMiddleware = require('../middlewares/authMiddleware');

// Privates
router.get('/', authMiddleware, guildsController.get);
router.post('/', authMiddleware, guildsController.set);
router.post('/setSettings', authMiddleware, guildsController.setSettings);
 
module.exports = router;

