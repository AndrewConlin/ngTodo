var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/todoCtrl');

// authenticate user! (make sure this comes before your routes)
router.use(ctrlMain.jwtAuthenticator);

router.get('/', ctrlMain.index);
router.get('/:id', ctrlMain.getOne);
router.put('/:id', ctrlMain.update);
router.post('/', ctrlMain.create);
router.delete('/:id', ctrlMain.destroy);

module.exports = router;
