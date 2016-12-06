/**
 * Created by benjaminstahl on 03.11.16.
 */

var r = require('rethinkdb');
var resultDB;

module.exports = {

    /**
     * request all content from database
     */
    getAllDBContent: function () {
        r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
            r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
                r.db('SocketDB').table('sockets').run(conn, function(err, cursor) {
                    if (err) throw err;
                    cursor.toArray(function(err, result) {
                        if (err) throw err;
                        resultDB = result;
                        //console.log(JSON.stringify(result, null, 2));
                    });
                });
            });
        });
    },

    /**
     * function which return the query content
     * @returns {*}
     */
    getResultDB: function () {
        return resultDB;
    },

    /**
     * function finished
     * @param socket
     */
    insertSocketToDB: function (socket) {
        r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
            if(err) throw err;
            r.db('SocketDB').table('sockets').insert({ name: socket.name, socketCodeOn: socket.socketCodeOn, socketCodeOff: socket.socketCodeOff, location: socket.socketLocation, socketStatus: socket.socketStatus}).run(conn, function(err, res)
            {
                if(err) throw err;
                console.log(res);
            });
        });
    },

    deleteSocketFromDB: function (socket) {
        r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
            if(err) throw err;
            r.db('SocketDB').table("sockets").filter({name: socket.name}).delete().run(conn, function (err, res) {
               if (err) throw err;
                console.log(res);

            });
        });

    },
    
    updateSocketStatus: function (socket) {
        r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
            if(err) throw err;
            if(socket.socStatus == "An"){
                r.db('SocketDB').table("sockets").filter({id: socket.socId}).update({socketStatus: "An"}).run(conn, function(err, res){
                    if (err) throw err;
                    console.log(res);
                });
            } else if(socket.socStatus == "Aus"){
                r.db('SocketDB').table("sockets").filter({id: socket.socId}).update({socketStatus: "Aus"}).run(conn, function(err, res){
                    if (err) throw err;
                    console.log(res);
                });
            }
        });
    },

    updateSocketNameInDB: function (socket, newName) {
        r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
            if(err) throw err;
            r.db('SocketDB').table("sockets").filter({id: socket.id}).update({name: newName}).run(conn, function(err, res){
                if (err) throw err;
                console.log(res);
            });
        });
    },

    testUpdate: function (socket, newName) {
        r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
            if(err) throw err;
            r.db('SocketDB').table("sockets").get('8e892d80-f363-4c72-b93b-63827db7eb38').update({name: newName}).run(conn, function(err, res){
                if (err) throw err;
                console.log(res);
            });
        });
    }
};



/**
r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
    if(err) throw err;
    r.dbCreate('SocketDB').tableCreate('sockets').run(conn, function (err, res) {
        if(err) throw err;
        console.log(res);
        r.table('sockets').insert({ name: 'Steckdose01', socketCodeOn: 5588305, socketCodeOff: 5588308, location: 'Schreibtisch'}).run(conn, function(err, res)
        {
            if(err) throw err;
            console.log(res);
        });
    });
});
 */

// view all tablet content
/**
r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
    r.db('SocketDB').table('sockets').run(conn, function(err, cursor) {
        if (err) throw err;
        cursor.toArray(function(err, result) {
            if (err) throw err;
            console.log(JSON.stringify(result, null, 2));
        });
    });
});
 */

// insert test-socket
/**
r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
    if(err) throw err;
    r.db('SocketDB').table('sockets').insert({ name: 'Steckdose01', socketCodeOn: 5588305, socketCodeOff: 5588308, location: 'Schreibtisch'}).run(conn, function(err, res)
    {
        if(err) throw err;
        console.log(res);
    });
});
 */


// create DB with table
/**
 r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
  if(err) throw err;
  r.db('SocketDB').tableCreate('sockets').run(conn, function(err, res) {
    if(err) throw err;
    console.log(res);
    r.table('sockets').insert({ name: 'Steckdose01', socketCodeOn: 5588305, socketCodeOff: 5588308, location: 'Schreibtisch'}).run(conn, function(err, res)
    {
      if(err) throw err;
      console.log(res);
    });
  });
});
*/

//
/**
 r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
     r.db('test').tableCreate('authors').run(conn, function(err, result) {
     if (err) throw err;
     console.log(JSON.stringify(result, null, 2));
     });
 });
 */

// insert some sample data
/**
 r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
     r.table('authors').insert([
     { name: "William Adama", tv_show: "Battlestar Galactica",
     posts: [
     {title: "Decommissioning speech", content: "The Cylon War is long over..."},
     {title: "We are at war", content: "Moments ago, this ship received word..."},
     {title: "The new Earth", content: "The discoveries of the past few days..."}
     ]
     },
     { name: "Laura Roslin", tv_show: "Battlestar Galactica",
     posts: [
     {title: "The oath of office", content: "I, Laura Roslin, ..."},
     {title: "They look like us", content: "The Cylons have the ability..."}
     ]
     },
     { name: "Jean-Luc Picard", tv_show: "Star Trek TNG",
     posts: [
     {title: "Civil rights", content: "There are some words I've known since..."}
     ]
     }
     ]).run(conn, function(err, result) {
     if (err) throw err;
     console.log(JSON.stringify(result, null, 2));
     });
 });
*/

// insert sample data
/**
 r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
  r.table('authors').insert([
    { name: "William Adama", tv_show: "Battlestar Galactica",
      posts: [
        {title: "Decommissioning speech", content: "The Cylon War is long over..."},
        {title: "We are at war", content: "Moments ago, this ship received word..."},
        {title: "The new Earth", content: "The discoveries of the past few days..."}
      ]
    },
    { name: "Laura Roslin", tv_show: "Battlestar Galactica",
      posts: [
        {title: "The oath of office", content: "I, Laura Roslin, ..."},
        {title: "They look like us", content: "The Cylons have the ability..."}
      ]
    },
    { name: "Jean-Luc Picard", tv_show: "Star Trek TNG",
      posts: [
        {title: "Civil rights", content: "There are some words I've known since..."}
      ]
    }
  ]).run(conn, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
  });
});
 */


// view all table data
/**
r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
    r.table('authors').run(conn, function(err, cursor) {
        if (err) throw err;
        cursor.toArray(function(err, result) {
            if (err) throw err;
            console.log(JSON.stringify(result, null, 2));
        });
    });
});
 */

// filter with name
/**
 r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
  r.table('authors').filter(r.row('name').eq("William Adama")).run(conn, function (err, cursor) {
    if (err) throw err;
    cursor.toArray(function (err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result, null, 2));
    });
  });
});
 */

/**
 r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
  r.table('authors').filter(r.row('name').eq("adam")).run(conn, function (err, cursor) {
    if (err) throw err;
    cursor.toArray(function (err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result, null, 2));
    });
  });
});
 */

// authors who have more than two posts
/**
 r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
  r.table('authors').filter(r.row('posts').count().gt(2)).
  run(conn, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result, null, 2));
    });
  });
});
 */

// Retrieve documents by primary key
/**
 r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
  r.table('authors').get('1e2fb426-a3e7-4b7e-86bb-27e58b5e5d3e').
  run(conn, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
  });
});
 */

// listen on changes
/**
 r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
  r.table('authors').changes().run(conn, function(err, cursor) {
    if (err) throw err;
    cursor.each(function(err, row) {
      if (err) throw err;
      console.log(JSON.stringify(row, null, 2));
    });
  });

});
 */


/**
 r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
  r.db('test').tableCreate('authors').run(conn, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
  });
});
 */

/**
 r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
  r.db('test').tableCreate('authors').run(conn, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
  });
});
 */

/**
 r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
  r.table('authors').update({type: "fictional"}).
  run(conn, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
  });
});
 */
