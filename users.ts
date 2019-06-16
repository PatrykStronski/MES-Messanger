import { Pool } from 'pg';
import { User } from './interfaces/User';
import { Credentials } from './interfaces/Credentials';
import * as crypto from 'crypto';

const pool = new Pool({
	user: 'azath',
	host: 'localhost',
	database: 'messanger',
	password: 'waran138',
	port: 5432
});

export function registerUser(user: User, cred: Credentials){
	console.log(user);
	console.log(cred);
	return new Promise((res,rej) => {
		pool.query(
			`INSERT INTO account(login,pass,name,lname) VALUES('${cred.login}','${cred.password}','${user.name}','${user.lname}');`
		,(err)=> {
			if(err) throw err;
			res();
		});
	});
}

export function getUserId(login:string): Promise<number>{
	return new Promise((resolve,reject) => {
		const id = pool.query(
			`SELECT id FROM account WHERE login LIKE '${login}';`, (err,res) => {
			if(err) throw err;
			resolve(res.rows[0].id);
		});
	});
}

export function getUser(cred: Credentials): Promise<User>{
	return new Promise((resolve,reject) => {
		pool.query(
			`SELECT * FROM account WHERE login LIKE '${cred.login}' AND pass LIKE '${cred.password}';`
		, (err,res) => {
			if(err) throw err;
			resolve(res.rows[0]);
		});
	});
}

export function authenticate(cred: Credentials){
	return new Promise((resolve,reject) => {
	const stream = pool.query(
		`SELECT auth('${cred.login}','${cred.password}');`
	,(err,res) =>{
			if(res.rows[0].auth){
				resolve(createToken(cred));
			} else {
				reject();
			}
		});
	});
}

function createToken(creds: Credentials): string{
	return "token";
}
