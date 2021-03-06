	import { Pool } from 'pg';
	import { Message } from './interfaces/Message';
	import { User } from './interfaces/User';
	import { getUserId } from './users'; 

	const pool = new Pool({
		user: 'azath',
		host: 'localhost',
		database: 'messanger',
		password: 'waran138',
		port: 5432
	});

	export function saveMessage(msg: Message, login1: string, login2: string){
		return new Promise((resolve,reject) => {
			pool.query(`SELECT convExists(${msg.conv});`,async (err,res) => {
				if(res.rows[0].convexists==false){
					msg.conv = await createConversation(login1,login2)
				}
				msg.author_id = await getUserId(msg.author);
				pool.query(
					`INSERT INTO message(author,date_written,conv,content) VALUES (${msg.author_id},'${msg.date_written}',${msg.conv},'${msg.content}');`, (err,res) => {
						if(err) throw err;
					resolve();
				});
			});
		});
	}

	export function fetchAllMsg(us1: string, us2: string): Promise<Message[]>{
	return new Promise(async (resolve,reject) => {
		const conv_id = await fetchConv(us1,us2);
		pool.query(
		 	`SELECT * FROM message WHERE conv=${conv_id};`, (err,res) => {
				if(err) throw err;
				if(res){
					if(res.rowCount>0){
					resolve(res.rows);
				} else {
					reject();
				}
				} else {
					reject();
				}
		});
	});
}

async function fetchConv(us1: string, us2: string){
	return new Promise(async (resolve,reject) => {
		const us1_id = await getUserId(us1);
		const us2_id = await getUserId(us2);
		const stream = await pool.query(
		 	'SELECT id FROM conversation WHERE (account1 = '+us1_id+' AND account2 = '+us2_id+') OR ( account1 = '+us2_id+' AND account2 = '+us1_id+');', (err,res)=> {
				if(err) throw err;
				if(res.rowCount>0){
				resolve(res.rows[0].id);
				} else {
					reject();
				}
			});
	});
}

async function greatestId(tablename:string): Promise<number>{
	return new Promise((resolve,reject)=> {
		pool.query(`SELECT MAX(id) FROM ${tablename};`,(err,res) => {
			if(err) throw err;
			resolve(res.rows[0].max);
		});
	});
}

async function createConversation(userlog1: string, userlog2: string): Promise<number>{
	return new Promise(async (resolve,reject) => {
		pool.query(`SELECT id FROM account WHERE login LIKE '${userlog1}' OR login LIKE '${userlog2}';`,(err,log_ids) => {
			let userid1 = log_ids.rows[0].id;
			let userid2 = log_ids.rows[1].id;
			pool.query(`INSERT INTO conversation(account1, account2) VALUES(${userid1},${userid2});`,async(err,res) => {
				if(err) throw err;
				resolve(await greatestId('conversation'));
			});
		});
	});
}

export async function getMessage(msgId: number){
	return new Promise((resolve,reject) => {
		pool.query(
			'SELECT * FROM message WHERE id='+msgId+' AS msg;', (err,res) => {
				if(err) throw err;
				resolve(res.rows[0]);
			});
	});
}
