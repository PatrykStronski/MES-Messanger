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

export function getMessage(msgId: number): Promise<string>https://www.antyradio.pl/media/galeria/171746/171751/38{
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
