import { Client } from 'ts-postgres';
import { User } from './interfaces/User';
import { Credentials } from './interfaces/Credentials';

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
		await clieny.end();
	});
}

export function authenticate(cred: Credentials): Promise{
	return new Promise(async(res,rej) => {
		const client = new Client();
		await client.connect();
		const stream = client.query(
			'SELECT auth('+cred.login+','+cred.password+') AS authorized;'
		);
		for await(const row of stream) {
			res(row.get('authorized'));
		}
		await clieny.end();
	});
}
