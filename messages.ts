import { Client } from 'ts-postgres';
import { Message } from './interfaces/Message';
import { User } from './interfaces/User';

export function saveMessage(msg: Message): Promise<undefined>{
	return new Promise(async (res,rej) =>{
		const client = new Client();
		await client.connect();
		const stream = client.query(
			'INSERT INTO message(author,date_written,conv) VALUES ('+msg.author+','+msg.date_written+','+msg.conv+');'
		);
		await client.end();
		res();
	});
}

export async function fetchAllMsg(conv_id: number): Message[]{
	const client = new Client();
	await client.connect();
	const stream = client.query(
	 	'SELECT FROM message WHERE conv='+conv_id+' AS msgs;'
	);
	let arr: Message[] = [];
	for await(const row of stream) {
		arr.push(row.get('msgs'));
	}
	return arr;
}

export async function fetchConv(us1: string, us2: string): number{
	const client = new Client();
	await client.connect();
	const stream = client.query(
	 	'SELECT FROM conversation WHERE (account1 LIKE '+us1+' OR '+'account2 LIKE '+us2+') AND ( account1 LIKE '+us2+'account2 LIKE '+us1+' AS con;'
	);
	for await(const row of stream) {
		return row.get('con');
	}
}

export function getMessage(msgId: number): Promise<string>{
	return new Promise(async (res,rej) =>{
		const client = new Client();
		await client.connect();
		const stream = client.query(
			'SELECT * FROM message WHERE id='+msgId+' AS msg;'
		);
		for await(const row of stream) {
			res(row.get('msg'));
		}

		await client.end();
	});
}
