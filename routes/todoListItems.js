var mongo = require('mongoskin')

var db = mongo.db('mongodb://Doug:Sewell@widmore.mongohq.com:10010/Queens')
    
exports.list = function(request, result) {
    if (request.session.user) {
        db.collection('todoListItems').find().toArray(function(err,res) {          
            result.render('todoListItems', {todoLists:res});
        });
    } else {
        result.redirect('/');
    }
};

exports.edit = function(request, result){
    if (request.session.user) {
        db.collection('todoListItems').findOne({_id:db.ObjectID.createFromHexString(request.params.id)},function(err,todoListItem) {
            db.collection('users').find({}).toArray(function(err,users) {
                result.render("todoListItemEdit",{title:"Something",users:users,todoListItem: todoListItem})    
            });
        });
    } else {
        result.redirect('/');
    }
};

exports.create = function(request, result){
    if (request.session.user) {
        db.collection('todoListItems').insert({name:request.body.name,todoListId:request.params.id},function(err,res) {               
            result.redirect('/todoLists/'+request.params.id);    
            });
    } else {
        result.redirect('/');        
    }    
};

exports.del = function(request, result){
    if (request.session.user) {
        db.collection('todoListItems').findOne({_id:db.ObjectID.createFromHexString(request.params.id)},function(err,res) {
            var existingTodoItem = res;
            db.collection('todoListItems').remove({_id:db.ObjectID.createFromHexString(request.params.id)},function(err,res) {   
                result.redirect('/todoLists/'+existingTodoItem.todoListId); 
            });
        });
    }
    else {
        result.redirect('/');        
    }              
};

exports.complete = function(request, result){
    if (request.session.user) {
        db.collection('todoListItems').findOne({_id:db.ObjectID.createFromHexString(request.params.id)},function(err,todoListItem) {
            todoListItem.complete = true;
      
            db.collection('todoListItems').save(todoListItem,function(err) {
                 result.redirect('/todoLists/'+todoListItem.todoListId);
            });
        });
    }
    else {
        result.redirect('/');        
    }              
};

exports.update = function(request, result){
    if (request.session.user) {
        db.collection('todoListItems').findOne({_id:db.ObjectID.createFromHexString(request.params.id)},function(err,todoListItem) {

            todoListItem.name = request.body.name;
            todoListItem.complete = request.body.complete;
            todoListItem.assignedUserId = request.body.assignedUserId;
            
            db.collection('todoListItems').save(todoListItem,function(err) {
                 result.redirect('/todoLists/'+todoListItem.todoListId);
            });
      });
    }  
    else {
        result.redirect('/');     
    }
};

exports.reopen = function(request, result){
    if (request.session.user) {
        db.collection('todoListItems').findOne({_id:db.ObjectID.createFromHexString(request.params.id)},function(err,todoListItem) {
            todoListItem.complete = false;
      
            db.collection('todoListItems').save(todoListItem,function(err) {
                 result.redirect('/todoLists/'+todoListItem.todoListId);
            });
        });
    }
    else {
        result.redirect('/');        
    }              
};

