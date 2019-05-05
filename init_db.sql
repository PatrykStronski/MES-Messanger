CREATE TABLE User (
	id SERIAL PRIMARY KEY,
	login VARCHAR(20) NOT NULL,
	password VARCHAR(20) NOT NULL, 
	name VARCHAR(30) NOT NULL, 
	l_name VARCHAR(30) NOT NULL, 
	avatar VARCHAR(30)
);

CREATE TABLE Conversation (
	id SERIAL PRIMARY KEY,
	user1 INT references User(id) NOT NULL,
	user2 INT references User(id) NOT NULL
);

CREATE TABLE Message (
	id SERIAL PRIMARY KEY,
	author INT references User(id) NOT NULL,
	date_written DATE NOT NULL,
	conv INT references Conversation(id) NOT NULL
)
