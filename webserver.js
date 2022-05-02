var http = require('http').createServer(handler);
var fs = require('fs');
var io = require('socket.io')(http)
var Gpio = require('onoff').Gpio;
var LED = new Gpio(4,'out'),
    LED2 = new Gpio(17,'out'),
    LED3 = new Gpio(27,'out'),
    LED4 = new Gpio(22,'out'),
    LED5 = new Gpio(10,'out'),
    LED6 = new Gpio(9,'out'),
    LED7 = new Gpio(11,'out');
var MOTO = [new Gpio(18,'out'),
            new Gpio(23,'out'),
            new Gpio(24,'out'),
            new Gpio(25,'out')];
var sec1 = [ //Derecha
    [1,0,0,0],
    [0,1,0,0],
    [0,0,1,0],
    [0,0,0,1]
    ];
var sec2 = [ //Izquierda
    [0,0,0,1],
    [0,0,1,0],
    [0,1,0,0],
    [1,0,0,0]
    ];
var apag = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
    ];
http.listen(1919);
function handler(req,res){
    fs.readFile(__dirname + '/public/index.html',function(err,data){
        if(err){
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}
