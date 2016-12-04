/**
 * Created by benjaminstahl on 23.10.16.
 */

var child_process = require('child_process'); // communication with the shell on raspberry

module.exports = {
    /**
     * the magic function which set the sockets on and off
     * @param socket
     * @returns {*}
     */
    setSocket: function (socket) {
        var path = '/home/pi/SocketSwitcher/switchTheSocket.sh';
        console.log("setSocket called");
        if(socket.socketStatus == 'Aus'){
            socket.socketStatus = "An";
            child_process.execFile(path, [socket.socketCodeOn],
                function (error, stdout, stderr) {
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    console.log("set " + socket.name + " " + socket.socketStatus);
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }
                });
            return socket;
        } else if(socket.socketStatus == 'An'){
            socket.socketStatus = "Aus";
            child_process.execFile(path, [socket.socketCodeOff],
                function (error, stdout, stderr) {
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    console.log("set " + socket.name + " " + socket.socketStatus);
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }
                });
        }
    }
};

