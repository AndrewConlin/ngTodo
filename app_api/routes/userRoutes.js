var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/userCtrl');

router.post('/', userCtrl.create);
router.post('/login', userCtrl.login);
// router.put('/:id', ctrlMain.update);
// router.delete('/:id', ctrlMain.destroy);

module.exports = router;
