var mongo = require('mongoskin')

var conn = mongo.db('mongodb://Doug:Sewell@widmore.mongohq.com:10010/Queens')
    
exports.list = function(request, result){
  conn.collection('users').find({}).toArray(function(err,users) {
     // now users is a list of all the users 
  });
};

exports.logout = function(req, res) {
      req.session.user = null
      res.redirect("/")
};

exports.login = function(req, res){
  conn.collection('users').findOne({email:req.body.email}, function(err,user) {
     if (err) throw err;
     
     if (user) {
         
        if (user.password === req.body.password) { 
            // Store user in session
            req.session.user = user
            res.redirect("/")
        } else {
            res.render('index',{title:"All of the things",email:req.body.email,message:"Incorrect password",currentUser: req.session.user})    
        }
        
     } else {
         res.render('index',{title:"All of the things",email:req.body.email,message:"Unable to find user",currentUser: req.session.user})
     }
  }); 
  
};

exports.register = function(req, res){
  res.render('register', { title: 'Express' });
};

exports.registerPost = function(req, res){


    var newUser = { email : req.body.email, name: req.body.name, password: req.body.password }
    conn.collection('users').insert(newUser)
    res.redirect('/');
};
