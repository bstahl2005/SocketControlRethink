var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./models/rethinkQuery');
var socketController = require('./logic/socket');



var sockets;

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render("pages/landing");
});

app.get("/socketoverviewpage", function (req, res) {
  // read all from DB
  db.getAllDBContent();
  setTimeout(function(){
      sockets = db.getResultDB();
      console.log(sockets);
      res.render("pages/socketoverview", {
          socket: sockets
      });
  }, 500);

    io.on("connection", function (socket) {
        // console.log("User has connected");
        // diese Nachricht nimmt der Server entgegen
        socket.on('switchSocket', function (socketFromClient) {
            // set socketStatus == "An" or "Off" --> for the gui
            db.updateSocketStatus(socketFromClient);
            // switch Socket on
            socketController.setSocket(socket);
        });
    });
});

app.get("/createsocketpage", function (req, res) {
    res.render("pages/createsocket");
    var socket55 = {
      name: 'Steckdose55'
    };
    db.deleteSocketFromDB(socket55);

    io.on("connection", function (socket) {
        console.log("Create Socket has connected");
        socket.on('createdSocket', function (socketFromClient) {
            //console.log(socketFromClient);
            console.log(socketFromClient.socName);
            // TODO check exists in database
            db.getAllDBContent();
            setTimeout(function () {
                sockets = db.getResultDB();

                var exists = true;
                sockets.forEach(function (socking) {
                    if(socking.name == socketFromClient.socName){
                        // already exists
                        console.log("socket exists!");
                        exists = true;
                    } else {
                        exists = false;
                        // not exists so let's insert
                        console.log("socket not exists!");
                        // show
                    }
                    // TODO Socket wird immer noch 2 mal eingefügt!!!
                });

                if(!exists){
                    db.insertSocketToDB(socketFromClient);
                }

            }, 300);
        });
    });
});

app.post("/createsocket", function (req, res) {
    res.render("pages/created");


});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



app.port = 9000;
server.listen(app.port, function () {
  console.log("Server ready on port: http://localhost:" + app.port);
});
