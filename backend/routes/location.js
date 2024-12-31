
const express = require('express');
const { saveLocation, getAllLocationsByUser } = require('../controllers/location');

const router = express.Router();


router.post('/save', saveLocation);
router.get('/savedAddress', getAllLocationsByUser);
module.exports = router
