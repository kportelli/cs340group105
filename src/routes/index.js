const express = require('express');
const router = express.Router();
var db = require('../database/db-connector');

router.get('/index', (req, res) => {
    res.render('index');
});


module.exports = router;