var SerialPort = require('serialport');

var Readline = SerialPort.parsers.Readline;
var port = new SerialPort('COM9', 9600, function (err) {
  if (err) {
    return console.log('Error: ', err.message);
  }
});


var parser = new Readline();
port.pipe(parser);
parser.on('data', console.log);