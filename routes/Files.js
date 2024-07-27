// routes/Filess.js
const express = require('express')
const router = express.Router()
const {uploadAndResizeFile} = require('../controller/file')

// Route to create directory
router.post('/compress-file',uploadAndResizeFile);

module.exports = router;
