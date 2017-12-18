var http = require('http');
var express = require('express');
var nodemailer = require('nodemailer');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json({ type: 'application/json' }));

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yourEmail@gmail.com',
    pass: 'yourPassword'
  }
});

app.post('/:email/:subject/:message', function(require, response) {
	const Email = require.params.email;
	const Subject = require.params.subject;
	const Message = require.params.message;
	var Mail = {
	  from: 'yourEmail@gmail.com',
	  to: Email,
	  subject: Subject,
	  text: Message,
	};
	transporter.sendMail(Mail, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});
});


app.get('/', function(require, response) {
response.send("Hello World");
});

http.createServer(app).listen(3000, function() {
 	console.log("Server is running");
});

