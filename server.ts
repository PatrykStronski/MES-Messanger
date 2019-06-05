import { Express } from 'express';
import { User } from './interfaces/User'; 
import * as users from './users';
import * as msg from './messages';
import { Credentials } from './interfaces/Credentials';
import { Message } from './interfaces/Message';
//import { FileManager } from './FileManager'; //here all file saving will be performed
import * as socketio from 'socket.io';

const app = new Express();
const http = require('http').Server(app); 

app.post('/register',(req,res)=> {
	let user: User = null;
	user.name = req.name;
	user.l_name = req.l_name;
	let cred: Credentials;
	users.registerUser(user)
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
		res.rendStatus(403);
	});
});

socketio.on("connection", (socket: any) => {
	console.log("a user connected");
	socket.on("message", function(message: Message) {
    console.log(message);
  });
});
