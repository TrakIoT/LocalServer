const express = require('express');
const { readingPostController } = require('../controllers/readings.controller');

const router = express.Router();

router.post('/', readingPostController);

module.exports = router;