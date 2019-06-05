import 'fs';
import { Buffer } from 'buffer';

export function saveFile(file: Buffer): Promise<string>{
	return new Promise((res,rej) => {
		res("a");
	});
}
