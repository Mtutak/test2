
var express = require("express");
var bodyParser = require("body-parser");
const passport = require('passport');
const mongoose = require('mongoose');

// var bluetooth = require('node-bluetooth');

// var bluetooth = require('./build/Release/node-bluetooth');


const Project = require('./models/Project');
const User = require('./models/user');


// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 8888;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

const config = require('./app/config/config.json');

require('./models').connect(config.dbUri);

const localSignupStrategy = require('./controllers/passport/localSignup');
const localLoginStrategy = require('./controllers/passport/localLogin');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./controllers/middleware/authCheck');
app.use('/api', authCheckMiddleware);


const authRoutes = require('./controllers/auth');
app.use('/auth', authRoutes);

const apiRoutes = require('./controllers/api');
app.use('/api', apiRoutes);

// var User = require("./models/user.js");
// const jwt = require('jsonwebtoken');
// const config = require('./app/config/config.json');

// app.get('/bluetooth', function(req, res) {
// 	console.log('im here');

//     // create bluetooth device instance
//     const device = new bluetooth.DeviceINQ();

//     var listOfDevices = {devices:[]};

//     device
//     .on('finished', function(){setTimeout(function(){
// 		    res.json(listOfDevices); 
//     }, 3000)})
//     .on('found', function found(address, name){
      
//       console.log('Found: ' + address + ' with name ' + name);
      
//       // find serial port channel
//       device.findSerialPortChannel(address, function(channel){
//         console.log('Found RFCOMM channel for serial port on %s: ', name, channel);
// 		var foundDevice={};
// 		foundDevice['name'] = name;
// 		foundDevice['address'] = address;
// 		foundDevice['channel'] = channel;
// 		listOfDevices['devices'].push(foundDevice);
// 		console.log(listOfDevices);
// 		    // res.json({
// 		    //   nameOfPhone: name
// 		    // }); 
//         // make bluetooth connect to remote device
//       //   bluetooth.connect(address, channel, function(err, connection){
//       //     if(err) return console.error(err);
//       //     connection.write(new Buffer('Hello!', 'utf-8'), function(){
//       //     	console.log('hey!');});
// 		    // res.json({
// 		    //   paired: true
// 		    // });
//       //     });
        
//       	} );
      
//     }).inquire();
// });


// app.post('/bluetooth/confirm', function(req, res) {
// 	console.log('AYE IM BACK');
// 	// console.log(req);

// 	var sentDeviceInfo=req.body;

//     // create bluetooth device instance
//     const device = new bluetooth.DeviceINQ();

//     // var listOfDevices = {devices:[]};

//     device
//     .on('finished', console.log.bind(console, 'finished'))
//     .on('found', function found(address, name){
      
//       console.log('Found: ' + address + ' with name ' + name);
//       if(address==sentDeviceInfo.deviceAddress){
// 	      // find serial port channel
// 	      device.findSerialPortChannel(address, function(channel){
// 	        console.log('Found RFCOMM channel for serial port on %s: ', name, channel);
// 			// var foundDevice=address;

// 			    // res.json({
// 			    //   nameOfPhone: name
// 			    // }); 
// 	        // make bluetooth connect to remote device
// 	        bluetooth.connect(address, channel, function(err, connection){
// 	          if(err){res.send(err)};
// 	          connection.write(new Buffer('Hello!', 'utf-8'), function(){
// 	          	// console.log('hey!');

// 		    	User.findOneAndUpdate({_id: sentDeviceInfo.loggedInUser}, { $pull: { "pendingConnections": sentDeviceInfo.friendToAdd }, $push: { "connections": sentDeviceInfo.friendToAdd } }, { new: true }, function(err, newdoc) {
// 				        // Send any errors to the browser
// 				        if (err) {
// 				          res.send(err);
// 				        }
// 				        // Or send the newdoc to the browser
// 				        else {

// 					       	User.findOneAndUpdate({_id: sentDeviceInfo.friendToAdd}, { $pull: { "pendingConnections": sentDeviceInfo.loggedInUser }, $push: { "connections": sentDeviceInfo.loggedInUser } }, { new: true }, function(err, newdoc) {
// 					        	// Send any errors to the browser
// 						        if (err) {
// 						          res.send(err);
// 						        }
// 						        // Or send the newdoc to the browser
// 						        else {
// 				    res.json({
// 				      friendAdded: true 
// 				    }); 	 

// 						        }
// 					    	})

// 				        }
// 				});


// 			    // res.json({
// 			    //   paired: true
// 			    // });
// 	          });
// 	          });
	        
// 	      	} );
      	
//       }
      
//     }).inquire();
// });

app.post('/projects/new', function(req, res){
      console.log('hit project new route!');
			console.log(req.body);
			console.log(req.body.data.title);
		// const token = req.headers.authorization.split(' ')[1];


	  // 	jwt.verify(token, config.jwtSecret, (err, decoded) => {
	  //   // the 401 code is for unauthorized status
	  //   	if (err) { res.status(401).end(); }

	  //   	const userId = decoded.sub;
	  //   // 			res.status(200).json({
		// 			//     loggedUser: userId
		// 			// }); 

	    	// create new project
	    	Project.create({
					creator: '58d1bd0d28594f86f2c4ba92',
					location: "Chicago, IL, United States",
					title: req.body.data.title,
					summary: req.body.data.category,
					detail: req.body.data.detail
				});

        res.status(200).json({
						    success: "successful new project"
						  }); 

	});

app.get('/projects', function(req, res){
			console.log('hit projects route!');

				Project.find({})
				.exec(function(error, doc){
							console.log(doc);
				      if (error) {
				          res.send(error);
				      }
				      // Or send the doc to the browser
				      else {
						  res.send(doc); 

				      };
        });
	});

	app.get('/projects/user', function(req, res){
		var userID = req.body.data.id;
			console.log('hit projects route!');
				Project.find({userID})
				.exec(function(error, doc){
							console.log(doc);
				      if (error) {
				          res.send(error);
				      }
				      // Or send the doc to the browser
				      else {
						  res.status(200).json({
						    connections: doc.connections
						  }); 

				      }
        });
	});

	app.post('/user/:uid/update', function(req, res){
			console.log('hit update route!');
			console.log(req.body);
			var doc = req.body.data;
			console.log(doc);
				User.findByIdAndUpdate(doc.id, { $set: { 
					title: doc.title,
					bio: doc.bio,
					detail: doc.detail,
					profileimg: doc.profileimg }}, { new: true }, function (err, profile) {
  				if (err) return handleError(err);
  				res.send(profile);
				});
	});
// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});