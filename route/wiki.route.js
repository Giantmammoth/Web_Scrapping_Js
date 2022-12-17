const express = require('express');
const router = express.Router();
const wikiCrtl = require('../controller/wiki.controller')

router.post('/:search', wikiCrtl.wikiApi);
router.post('/openai/test', wikiCrtl.openai);

module.exports = router;