export interface Message{
	author: string;
	author_id?: number;
	date_written: string;
	conv: number;
	read: boolean;
	content: string;
}
