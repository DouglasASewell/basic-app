
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express', email : "", message : "", currentUser: req.session.user });
};

exports.sayHello = function(name) {
  return "Hello "+name;  
};


exports.receiveForm = function(req, res){
  if (req.body.username === 'Doug') {
      res.send('HOORAAAAY!')
      res.render('home',{}) 
  }
  else {
        res.render('index',{ title:"Home", username : req.body.username, message: "Your login is incorrect", currentUser: req.session.user})
  }
 
  
};