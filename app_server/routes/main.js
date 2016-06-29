var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
  console.log(__dirname);

  res.sendFile('index.html', {
    root : 'app_server/views/'
  });
});

module.exports = router;
