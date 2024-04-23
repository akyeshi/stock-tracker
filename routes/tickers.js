
const router = require('express').Router(); 
const stocksCtrl = require('../controllers/tickers'); 


// GET /tickers
router.get('/', stocksCtrl.index); 





module.exports = router; 