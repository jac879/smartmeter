var SerialPort = require('serialport');

var admin = require("firebase-admin");


var serviceAccount = "databaseKey.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://smartmeter-v1.firebaseio.com/"
});

let mainObj = {};
let timeStart = Date.now();
mainObj[timeStart] = {};

function sendData() {

   var time = Date.now();

   console.log(mainObj);
   admin.database().ref("meterData").update(mainObj);

   mainObj = {};
   timeStart = time;
   mainObj[timeStart] = {};

   console.log(mainObj);

}
setInterval(sendData, 10*1000);

var Readline = new SerialPort.parsers.Readline;
var port = new SerialPort('COM9');
var parser = port.pipe(new SerialPort.parsers.Readline({delimiter: '\r\n'}));
parser.on('data', (data)=>{
	 var arr = data.split("_");

            var obj = {};
            obj['rmsPower'] = arr[0];
            obj['rmsCurrent1'] = arr[1];
            obj['rmsCurrent2'] = arr[2];
            
            var timeRn = Date.now();

            mainObj[timeStart][timeRn] = obj;


        console.log(obj);
        


});