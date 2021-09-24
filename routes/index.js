const express = require('express');

const controllers = require('../controllers/index.js');

const router = express.Router();

/* ========== Routes ========== */
router.get('/', controllers.index);

module.exports = router;
