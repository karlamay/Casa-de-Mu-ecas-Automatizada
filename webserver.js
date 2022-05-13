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
var MOTO = [
            new Gpio(18, 'out'),
            new Gpio(23, 'out'),
            new Gpio(24, 'out'),
            new Gpio(25, 'out')
];
var motoInterval = setInterval(MOTO,5);

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

io.sockets.on('connection', function (socket) {
    socket.on('domo', function(data) {
      switch(data){
        case '0000':
          LED.writeSync(0);
          break;
        case '0001':
          LED.writeSync(1);
          break;
        case '0010':
          LED2.writeSync(0);
          break;
        case '0011':
          LED2.writeSync(1);
          break;
        case '0100':
          LED3.writeSync(0);
          break;
        case '0101':
          LED3.writeSync(1);
          break;
        case '0110':
          LED4.writeSync(0);
          break;
        case '0111':
          LED4.writeSync(1);
          break;
        case '1000':
          LED5.writeSync(0);
          break;
        case '1001':
          LED5.writeSync(1);
          break;
        case '1010':
          LED6.writeSync(0);
          break;
        case '1011':
          LED6.writeSync(1);
          break;
        case '1100':
          LED7.writeSync(0);
          break;
        case '1101':
          LED7.writeSync(1);
          break;
        case 'D':
          MOTO=[1,0,0,0];
          MOTO=[0,1,0,0];
          MOTO=[0,0,1,0];
          MOTO=[0,0,0,1];

      }
    });
  });
  
  process.on('SIGINT', function () {
    LED.writeSync(0);
    LED.unexport();
    LED2.writeSync(0);
    LED2.unexport();
    LED3.writeSync(0);
    LED3.unexport();
    LED4.writeSync(0);
    LED4.unexport();
    LED5.writeSync(0);
    LED5.unexport();
    LED6.writeSync(0);
    LED6.unexport();
    LED7.writeSync(0);
    LED7.unexport();
    MOTO.unexport();
    process.exit();
});