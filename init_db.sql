CREATE TABLE Account (
	id SERIAL PRIMARY KEY,
	login VARCHAR(20) NOT NULL,
	password VARCHAR(20) NOT NULL, 
	name VARCHAR(30) NOT NULL, 
	l_name VARCHAR(30) NOT NULL, 
	avatar VARCHAR(30)
);

CREATE TABLE Conversation (
	id SERIAL PRIMARY KEY,
	account1 INT references Account(id) NOT NULL,
	account2 INT references Account(id) NOT NULL
);

CREATE TABLE Message (
	id SERIAL PRIMARY KEY,
	author INT references Account(id) NOT NULL,
	date_written TIMESTAMP NOT NULL,
	conv INT references Conversation(id) NOT NULL,
	read BOOLEAN default false
);
