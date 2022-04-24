const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '12345',
	database : 'usersdb'
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


//app.use(express.static(__dirname + 'public'))

//console.log("Server Started");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/Logsin.html");
})
app.get('/LogSin.css', function(req, res) {
	res.sendFile(__dirname + "/" + "Logsin.css");
});
  app.get('/LogSin.js', function(req, res) {
	res.sendFile(__dirname + "/" + "LogSin.js");
});
app.get('/ChangePass.html', function(req, res) {
	res.sendFile(__dirname + "/" + "ChangePass.html");
});

/*connection.query("SELECT * FROM users", function (err, result, fields) {
	if (err) throw err;
	console.log(result);
  });*/
  

  app.post('/register', function(request, response)
   {
	   module.exports.register=function(req,res){
		
		var users={
			"username":req.body.username,
			"email":req.body.email,
			"password":req.body.password,
			
		}
		connection.query('INSERT INTO users SET ?',users,function(error, results, fields){
		  if(error){
			res.json({
				status:false,
				message:'there are some error with query'
			})
		  }else{
			  res.json({
				status:true,
				data:results,
				message:'user registered sucessfully'
			})
		  }
		});
		
	}
  });

  
  app.post('/login', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	//response.send(' Username is : ' +username +' pass is : ' + password);
    //var results = []
	if (username && password) {
		connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			
			if (results ?.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});


//app.listen(3000);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
