var Mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var dbURL = 'mongodb://localhost:27017/ngTodo';
var bcrypt = require('bcrypt');
const saltRounds = 15;
var jwt = require('jsonwebtoken');
var secret = require('../../.credentials.js').secret;
if (process.env.NODE_ENV == 'production'){
  secret = process.env.SECRET;
}

module.exports.login = function(req, res){
  console.log('in user login');
  Mongo.connect(dbURL, function(err,db){
     if(err) return next(err);
     var coll = db.collection('users');
     coll.findOne({username : req.body.username}, function(err,user){
       if (err) return next(err);

       bcrypt.compare(req.body.password, user.password, function(err,result){
         if (err) return next(err);
         if (!result) {
           res.status(401);
           res.json({error : "Incorrect password"});
         }
         if (result) {
           res.status(200);
           res.json({token : generateJwt(user)});
         }
       });
     });
   });
};

module.exports.create = function(req, res){
  Mongo.connect(dbURL,function(err,db){
    if (err) return next(err);
    var users = db.collection('users');
    bcrypt.hash(req.body.password, saltRounds, function(err, hash){
      users.insert({
        username : req.body.username,
        email : req.body.email,
        password : hash,
        tasks: []
      }, function(err, result){
        if (err) return next(err);
        res.status(201);
        res.json(result);
        db.close();
      });
    });
  });
};

// Helper for JWTs
var generateJwt = function(user) {
  // Set JWT to expire after 24 hours
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 1);

  // Encode JWT with user data
  return jwt.sign({
    id : user._id,
    email : user.email,
    username : user.username,
    exp : parseInt(expiry.getTime() / 1000)
  }, secret);
};
