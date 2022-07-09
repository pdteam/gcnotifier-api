var router = require('express').Router();


//Import the controller(s)
const notifierController = require('../controllers/notifier');

//Sub Routes
router.post('/',  notifierController.postControl);

//export the router back to the index.js page
module.exports = router;