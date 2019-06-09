import {expect, assert} from 'chai';
import * as users from '../users';
import { Credentials } from '../interfaces/Credentials';
import { User } from '../interfaces/User';

// insert user to db
{
	const cred: Credentials = {login: "fajnyUser",password: "chujowechasło"}
	const cred2: Credentials = {login: "głupiUser",password: "chujowechasło"}
	const us: User = {name: "fajny user",lname: "barszo fajny"}
	users.getUser(cred)
	.then((repl) => {
		expect(repl).to.be.an('object');
		expect(repl.name).to.be.equal(us.name);
		expect(repl.lname).to.be.equal(us.lname);
	})
	.catch(err => {
		throw err;
	});
	users.authenticate(cred)
	.then(str=> {
		expect(str).to.be.a('string');
	})
	.catch(() => {
	});
	users.authenticate(cred2)
	.then(str=>{
		assert.fail("should not be found")
	})
	.catch(() =>{
	});
}