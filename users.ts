import { Client } from 'ts-postgres';
import { User } from './interfaces/User';
import { Credentials } from './interfaces/Credentials';
import * as crypto from 'crypto';

export function registerUser(user: User, cred: Credentials): Promise{
	return new Promise(async (res,rej) => {
		const client = new Client();
		await client.connect();
		const stream = client.query(
			'INSERT INTO account(login,pass,name,lname) VALUES('+cred.login+','+cred.password+','+user.name+','+user.l_name+');'
		);
		await client.end();
		res();
	});
}

export function getUser(cred: Credentials): Promise{
	return new Promise(async (res,rej) => {
		const client = new Client();
		await client.connect();
		const stream = client.query(
			'SELECT * FROM accounts WHERE login LIKE'+cred.login+' AND pass LIKE'+cred.password+' AS us;'
		);
		for await(const row of stream) {
			res(row.get('us'));
		}
		await client.end();
	});
}

export function authenticate(cred: Credentials): Promise<any>{
	return new Promise(async(res,rej) => {
		const client = new Client();
		await client.connect();
		const stream = client.query(
			'SELECT auth('+cred.login+','+cred.password+') AS authorized;'
		);
		let ind: boolean = false;
		for await(const row of stream) {
			if(row.get('authorized')){
				ind=true;
			}
		}
		await client.end();
		if(ind){
			res(createToken());
		} else {
			rej();
		}
	});
}

function createToken(): string{
}
