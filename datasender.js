
//init serial port and firebase admin
var SerialPort = require('serialport');
var admin = require("firebase-admin");

// connect database key to be able to have admin access to database
var serviceAccount = "databaseKey.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://smartmeter-v1.firebaseio.com/"
});

//init a blank object with a timestamp to start dumping data into.
let mainObj = {};
let timeStart = Date.now();
mainObj[timeStart] = {};

// this function logs that data to the database every 10 seconds.
function sendData() {

   var time = Date.now();

   console.log(mainObj);
   admin.database().ref("meterData").update(mainObj);

   mainObj = {};
   timeStart = time;
   mainObj[timeStart] = {};

  // console.log(mainObj);

}
setInterval(sendData, 10*1000);

//set up to listen to strings from port
var Readline = new SerialPort.parsers.Readline;
var port = new SerialPort('COM10');

// break sting up into individual data packets
var parser = port.pipe(new SerialPort.parsers.Readline({delimiter: '\n'}));
parser.on('data', (data)=>{

	 var arr = data.split("_");

	 		//populate an object with the data from serial.
            var obj = {};
            obj['rmsPower'] = arr[0];
            obj['rmsCurrent1'] = arr[1];
            obj['rmsVoltage1'] = arr[2];
            obj['rmsCurrent2'] = arr[3];
            obj['rmsVoltage2'] = arr[4];
            
            
            var timeRn = Date.now();

            mainObj[timeStart][timeRn] = obj;

      //  console.log(obj);
        


});