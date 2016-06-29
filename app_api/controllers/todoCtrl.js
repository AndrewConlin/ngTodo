var Mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var dbURL = 'mongodb://localhost:27017/ngTodo';

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
