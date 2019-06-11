import Express = require('express');
import { User } from './interfaces/User'; 
import * as users from './users';
import * as msg from './messages';
import { Credentials } from './interfaces/Credentials';
import { Message } from './interfaces/Message';
//import { FileManager } from './FileManager'; //here all file saving will be performed
import * as socketio from 'socket.io';
import { Auth } from './interfaces/Auths';
import * as _ from 'underscore';
import redis = require('socket.io-redis');
import bodyparser = require('body-parser');

const app = Express();
app.use(bodyparser);
let http = require("http").Server(app);
let io = require("socket.io")(http);
io.adapter(redis({ host: 'localhost', port: 6379 }));

let tokens: Auth[] = []

app.post('/register',(req,res)=> {
	let user: User = req.body.user;
	user.lname = req.body.lname;
	let cred: Credentials = req.body.credentials;
	users.registerUser(user,cred)
	.then(()=>{
		res.sendStatus(200);
	})
	.catch(()=> {
		res.sendStatus(500);
	});
});

app.post('/login',(req,res) => {
	let cred: Credentials = req.body;
	users.authenticate(cred)
	.then((token) => {
		res.send(token);
	})
	.catch(() => {
		res.sendStatus(403);
	});
});

app.post('/logout',(req,res)=> {
	_.find(tokens,(elem,i)=> {
		if(elem.token===req.body.token){
			tokens.splice(i,1);
			return true;
		}
		return false;
	});
	res.sendStatus(200);
});

io.on("connection", (socket: any) => {
	console.log("a user connected");
	socket.on("message",(message: any)=> {
		msg.saveMessage(message.mgs,message.us1,message.us2)
		.then(() => {
			socket.emit(message);
		})
		.catch(() => {
			console.log("something with connection");
		})
  });
});

app.post('/whole_conversation',(req,res) => {
	let us1 = req.body.users[0];
	let us2 =	req.body.users[1];
	msg.fetchAllMsg(us1,us2)
	.then((msgs) => {
		res.send(msgs);
	})
	.catch(() => {
		res.sendStatus(203);
	});
});

app.post('/getMessage', (req,res) => {

});

io.listen(8081)
app.listen(8080,() => {
	console.log("serv init");
});
