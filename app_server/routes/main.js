var express = require('express');
var router = express.Router();

router.use(function(req,res,next){
  res.sendFile('index.html', {
    root : 'app_server/views/'
  });
});

module.exports = router;
