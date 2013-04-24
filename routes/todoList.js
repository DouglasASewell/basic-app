var mongo = require('mongoskin')

var db = mongo.db('mongodb://Doug:Sewell@widmore.mongohq.com:10010/Queens')

exports.list = function(request, result){
    if (request.session.user) {
        db.collection('todoLists').find({"participantIds":request.session.user._id.toString()}).toArray(function(err,res) {   
            result.render('todoLists', {todoLists:res});    
        });
    } else {
        result.redirect('/');
    }
};

exports.create = function(request, result){
    db.collection('todoLists').insert({name:request.body.name,participantIds:[request.session.user._id.toString()]},function(err,res) {   
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
  db.collection('todoLists').findOne({_id:db.ObjectID.createFromHexString(request.params.id)},function(err,todoList) {   
        todoList.name = request.body.name;
        
        todoList.participantIds = [];
        
        for (var key in request.body) {
            if (request.body.hasOwnProperty(key)) {
                if (key.substring(0,5) === "user-") {
                    if (request.body[key] === "on") {
                        todoList.participantIds.push(key.substring(5,key.length))   
                    }
                }
            }
        }
        
        db.collection('todoLists').save(todoList,function(err) {
                 result.redirect('/todoLists/'+todoList._id);
            });
    });
};