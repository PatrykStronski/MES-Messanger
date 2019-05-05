import { Express } from 'express';
import { users } from './users'; // here all user management is performed
import { User } from './User'; 
import { Credentials } from './Credentials';
import { FileManager } from './FileManager'; //here all file saving will be performed

const app = new Express();

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
}):
