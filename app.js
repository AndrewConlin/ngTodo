var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//access oublic directory for static content
app.use(express.static(__dirname + '/app_server/public'));
app.use(express.static(__dirname + '/app_client'));

//configure body paser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app routes
app.use('/', require('./app_server/routes/main'));
app.use('/todos', require('./app_api/routes/todoRoutes'));

//custom 404
app.use(function(req, res){
      res.status(404);
      res.send('404');
});

//custom 500
app.use(function(err, req, res, next){
      console.log(err.stack);
      res.status(500);
      res.json(err);
});

//Configure app to listen on port 3000
app.listen(3000, function(){
      console.log('ngApp started on http://localhost:' + 3000 + '; press ctrl-c to terminate.');
});
