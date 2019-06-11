import { Pool } from 'pg';
import { Message } from './interfaces/Message';
import { User } from './interfaces/User';

const pool = new Pool({
	user: 'azath',
	host: 'localhost',
	database: 'messanger',
	password: 'waran138',
	port: 5432
});

export async function saveMessage(msg: Message, login1: string, login2: string){
	const chk_conv = await pool.query(`SELECT convExists(${msg.conv});`);
	if(chk_conv.rows[0].convExists==false){
		var convid = await createConversation(login1,login2)
	}
	console.log(convid);
	const stream = await pool.query(
		`INSERT INTO message(author,date_written,conv) VALUES ('${msg.author}','${msg.date_written}','${msg.conv}');`
	);
}

export async function fetchAllMsg(us1: string, us2: string){
	const conv_id = fetchConv(us1,us2);
	console.log(conv_id);
	const stream = await pool.query(
	 	`SELECT * FROM message WHERE conv='${conv_id}';`
	);
	if(stream.rowCount>0){
		return stream.rows[0];
	} else {
		return Promise.reject();
	}
}

async function fetchConv(us1: string, us2: string){
	const stream = await pool.query(
	 	'SELECT id FROM conversation WHERE (account1 LIKE '+us1+' AND account2 LIKE '+us2+') OR ( account1 LIKE '+us2+' AND account2 LIKE '+us1+';'
	);
	console.log(stream);
	return stream.rows[0];
}

async function createConversation(userlog1: string, userlog2: string){
	const log_ids = await pool.query(`SELECT id FROM account WHERE login LIKE ${userlog1} OR login LIKE ${userlog2};`);
	let userid1 = log_ids.rows[0].id;
	let userid2 = log_ids.rows[1].id;
	const stream = await pool.query(`INSERT INTO conversation(account1, account2) VALUES(${userid1},${userid2});`);
}

export async function getMessage(msgId: number){
	const stream = await pool.query(
		'SELECT * FROM message WHERE id='+msgId+' AS msg;'
	);
}
