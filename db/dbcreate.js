/**
 * Create the database and tables if they do not already exist
 */

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database(__dirname + '/inspections.db');

db.run("CREATE TABLE IF NOT EXISTS Establishment( \
			eid		INTEGER PRIMARY KEY AUTOINCREMENT, \
			name	TEXT NOT NULL, \
			pic		TEXT, \
			addr1	TEXT, \
			addr2	TEXT, \
			town	TEXT, \
			state	TEXT, \
			zip		TEXT )");

db.run("CREATE TABLE IF NOT EXISTS Form( \
			fid		INTEGER PRIMARY KEY AUTOINCREMENT, \
			eid		INTEGER NOT NULL, \
			date 	TEXT NOT NULL, \
			FOREIGN KEY(eid) REFERENCES Establishment(eid) )");

db.run("CREATE TABLE IF NOT EXISTS Violation( \
			vid		INTEGER PRIMARY KEY AUTOINCREMENT, \
			fid		INTEGER NOT NULL, \
			codeRef	TEXT, \
			isCrit	BOOLEAN NOT NULL, \
			description TEXT NOT NULL, \
			FOREIGN KEY(fid) REFERENCES Form(fid) )");

// Picture related stuff