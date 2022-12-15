const express = require('express');
const router = express.Router();
const wikiCrtl = require('../controller/wiki.controller')

router.post('/:search', wikiCrtl.wikiApi);

module.exports = router;