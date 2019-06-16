import {expect, assert} from 'chai';
import * as users from '../users';
import { Credentials } from '../interfaces/Credentials';
import { User } from '../interfaces/User';

// insert user to db
async function testSuite(){
	const cred: Credentials = {login: "xxxuser",password: "hasło"}
	const cred2: Credentials = {login: "tser",password: "hasło"}
	const us: User = {name: "test",lname: "test_XXX"}
	try{
	await users.registerUser(us,cred)
	} catch(e){
		console.log('user is already present');
	}
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

testSuite();
