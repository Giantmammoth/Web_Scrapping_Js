const express = require('express');
const router = express.Router();
const googlecrtl = require('../controller/google.controller')

router.post('/search/:search', googlecrtl.googleSearchData);
router.post('/meteo/:search', googlecrtl.googleMeteoData);
router.post('/news', googlecrtl.googleNewsData);

module.exports = router;