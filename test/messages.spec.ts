import {expect, assert} from 'chai';
import * as msg from '../messages';
import { Credentials } from '../interfaces/Credentials';
import { User } from '../interfaces/User';
import { Message } from '../interfaces/Message';

{
	const msg1: Message = {
		author: 2,
		date_written: '2019/12/04 12:42:42',
		conv: 0,
		read: false
	}
	msg.fetchAllMsg(1)
	.then((data) => {
		assert.fail();
	})
	.catch(() => {
	});
}