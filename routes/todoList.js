var mongo = require('mongoskin')

var db = mongo.db('mongodb://Doug:Sewell@widmore.mongohq.com:10010/Queens')

exports.list = function(request, result){
    if (request.session.user) {
        db.collection('todoLists').find().toArray(function(err,res) {   
            result.render('todoLists', {todoLists:res});    
        });
    } else {
        result.redirect('/');
    }
};

exports.create = function(request, result){
    db.collection('todoLists').insert({name:request.body.name},function(err,res) {   
            console.log(res);
            
            result.redirect('/todoLists');
            
            });
};

exports.show = function(request, result){
    db.collection('todoLists').findOne({_id:db.ObjectID.createFromHexString(request.params.id)},function(err,todoList) {   
        
        db.collection('todoListItems').find({todoListId:request.params.id}).toArray(function(err,todoListItems) {   
                
            db.collection('users').find({}).toArray(function(err,users) {   

                result.render('todoListShow', {todoList:todoList, users:users, todoListItems:todoListItems});
            });    
        });
        
            
    });
};

exports.del = function(request, result){
  
    db.collection('todoLists').remove({_id:db.ObjectID.createFromHexString(request.params.id)},function(err,res) {   
            console.log(res);
            
            result.redirect('/todoLists');
            
            });
};

exports.update = function(request, result){
  result.send("respond with a resource");
};