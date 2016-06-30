var Mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var dbURL = 'mongodb://localhost:27017/ngTodo';

var secret = process.env.SECRET || require('../../.credentials').secret;
var jwt = require('jsonwebtoken');

//CRUD
module.exports.index = function(req, res){
  Mongo.connect(dbURL, function(err,db){
    if (err) return next(err);
    var todos = db.collection('todos');
    todos.find().toArray(function(err, docs){
      if (err) return next(err);
      res.json(docs);
      db.close();
    });
  });
};

module.exports.getOne = function(req, res){
  var objID = ObjectId(req.params.id);
  Mongo.connect(dbURL, function(err,db){
    if (err) return next(err);
    var todos = db.collection('todos');
    todos.find({_id : objID}).toArray(function(err, docs){
      if (err) return next(err);
      res.json(docs[0]);
      db.close();
    });
  });
};

module.exports.update = function(req, res){
  var objID = ObjectId(req.params.id);
  Mongo.connect(dbURL,function(err,db){
    if (err) return next(err);
    var todos = db.collection('todos');
    todos.updateOne({_id : objID}, {task: req.body.task, completed: req.body.completed}, function(err,result){
      if (err) return next(err);
      if (result.result.nModified < 1) {
        return res.sendStatus(404);
      }
      res.sendStatus(202);
      db.close();
    });
  });
};

module.exports.create = function(req, res){
  Mongo.connect(dbURL,function(err,db){
    if (err) return next(err);
    var todos = db.collection('todos');
    todos.insertOne(req.body, function(err,result){
      if (err) return next(err);
      res.sendStatus(201);
      db.close();
    });
  });
};

module.exports.destroy = function(req, res){
  var objID = ObjectId(req.params.id);
  Mongo.connect(dbURL, function(err,db){
    if (err) return next(err);
    var todos = db.collection('todos');
    todos.remove({_id : objID}, function(err, result){
      if (err) return next(err);
      if (result.result.ok < 1 || result.result.n < 1) {
        return res.sendStatus(404);
      }
      res.sendStatus(202);
      db.close();
    });
  });
};

//WEB TOKINS
module.exports.jwtAuthenticator = function(req,res,next){
  // 1. Store the value of the 'x-access-token' header
  // in a variable
  var token = req.headers['x-access-token'];
  // 2. If the token is defined...
  if (token) {
    // 3. Use the 'jsonwebtoken' packages verify method
    jwt.verify(token, secret, function(err,decoded){
      // 4. If there is an error, or the decoded token is
      // not defined respond 401
      if(!decoded || err) {
        res.status(401);
        return res.json({
          success : false,
          message : 'Failed to authenticate token'
        });
      } else {
      // 5. If all goes well, store the decoded JWT in a
      // 'payload' property on the request (in case we need it later)
      // call 'next()' to move to the next middleware function
        req.payload = decoded;
        next();
      }
    });
  } else {
    // 6. If the token was undefined...
    res.status(401);
    res.json({
      success : false,
      message : 'No token provided'
    });
  }
};
