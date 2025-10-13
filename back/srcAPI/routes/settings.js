const express = require('express');
const router = express.Router();

const settingsController = require('../controllers/settingsController');
const authMiddleware = require('../middlewares/authMiddleware');

// Privates
router.get('/', authMiddleware, settingsController.get);
router.post('/', authMiddleware, settingsController.set);
router.put('/', authMiddleware, settingsController.set);

module.exports = router;

