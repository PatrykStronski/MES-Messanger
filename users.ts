import { Client } from 'ts-postgres';
import { User } from './interfaces/User';
import { Credentials } from './interfaces/Credentials';

export function registerUser(user: User, cred: Credentials): Promise{
	return new Promise((res,rej) => {
	});
}

export function getUser(): Promise{
	return new Promise((res,rej) => {
	});
}

export function authenticate(cred: Credentials): Promise{
	return new Promise((res,rej) => {
	});
}
