import express = require('express');
import { User } from './interfaces/User'; 
import * as users from './users';
import * as msg from './messages';
import { Credentials } from './interfaces/Credentials';
import { Message } from './interfaces/Message';
import { Auth } from './interfaces/Auths';
import * as _ from 'underscore';
import bodyparser = require('body-parser');
import * as path from 'path';

const app: express.Application = express();
//app.use(bodyparser);
app.use(bodyparser.json());
let tokens: Auth[] = []

app.get('/',(req,res) => {
	res.sendFile(path.resolve(__dirname,'login.html'));
});

app.get('/chat',(req,res) => {
	res.sendFile(path.resolve(__dirname,'chat.html'));
});

app.post('/register',(req,res)=> {
	console.log(req.body);
	let user: User = req.body.user;
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
	console.log(cred);
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

/*io.on("connection", (socket: any) => {
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
*/
app.post('/sendmessage',async (req,res) => {
	let mes: Message = req.body.message;
	let us1: string = req.body.user1;
	let us2: string = req.body.user2;
	try{
	await msg.saveMessage(mes,us1,us2);
	} catch(err) {
		res.sendStatus(500);
	}
	res.sendStatus(200);
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

app.listen(3000,() => {
	console.log("serv init");
});
