import {expect, assert} from 'chai';
import * as msg from '../messages';
import { Credentials } from '../interfaces/Credentials';
import { User } from '../interfaces/User';
import { Message } from '../interfaces/Message';

{
	const log1 = 'user';
	const log2 = 'dupa';
	const msg1: Message = {
		author: log1,
		date_written: '2019/12/04 12:42:42',
		conv: 1,
		content: "caidscbyisfbvuadfnvoudnfo",
		read: false
	}
	msg.fetchAllMsg(log1,log2)
	.then((data) => {
		assert.fail();
	})
	.catch(() => {
	});
	msg.saveMessage(msg1,log1,log2)
	.then(() =>{
		msg.fetchAllMsg(log1,log2)
		.then((conv) => {
			console.log(conv);
			expect(conv.length).to.be.at.least(1);
		});
	})
	.catch(() => {
		assert.fail();
	});
}
