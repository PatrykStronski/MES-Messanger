import { Client } from 'ts-postgres';
import { User } from './User';
import { Credentials } from './Credentials';

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
