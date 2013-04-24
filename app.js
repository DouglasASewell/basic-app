
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , todoLists = require('./routes/todoList')
  , todoListItems = require('./routes/todoListItems')
  , http = require('http')
  , path = require('path');
  
  
var app = express();

app.locals._ = require("underscore");

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.cookieParser('asdlkasjdas8d7ad7asda'));
  app.use(express.session({ secret: 'asdlkasjdas8d7ad7asda' }));
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/logout', user.logout);
app.post('/login',user.login);


app.get('/register',user.register);
app.post('/register',user.registerPost);

app.get("/todoLists",todoLists.list)
app.post("/todoLists",todoLists.create)
app.get("/todoLists/:id",todoLists.show)
app.post("/todoLists/:id/items",todoListItems.create)
app.post("/todoLists/:id",todoLists.update)
app.get("/todoLists/:id/delete",todoLists.del)

app.get("/todoListItems",todoListItems.list)

app.get("/todoListItems/:id",todoListItems.edit)
app.post("/todoListItems/:id",todoListItems.update)

app.get("/todoListItems/:id/reopen",todoListItems.reopen)
app.get("/todoListItems/:id/complete",todoListItems.complete)
app.get("/todoListItems/:id/delete",todoListItems.del)

app.get('/users', user.list);

app.post('/', routes.receiveForm);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


