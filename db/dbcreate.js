/**
 * Create the database and tables if they do not already exist
 */

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database(__dirname + '/inspections.db');

db.run("CREATE TABLE IF NOT EXISTS Establishment( \
			eid		INT NOT NULL AUTOINCREMENT, \
			name	TEXT NOT NULL, \
			pic		TEXT, \
			addr1	TEXT, \
			addr2	TEXT, \
			town	TEXT, \
			state	TEXT, \
			zip		INT, \
			PRIMARY KEY(eid) )");

db.run("CREATE TABLE IF NOT EXISTS Form( \
			fid		INT NOT NULL AUTOINCREMENT, \
			eid		INT NOT NULL, \
			date 	TEXT NOT NULL, \
			PRIMARY KEY(fid), \
			FOREIGN KEY(eid) REFERENCES Establishment(eid) )");

db.run("CREATE TABLE IF NOT EXISTS Violation( \
			vid		INT NOT NULL AUTOINCREMENT, \
			fid		INT NOT NULL, \
			codeRef	TEXT, \
			isCrit	BOOLEAN NOT NULL, \
			description TEXT NOT NULL, \
			PRIMARY KEY(vid), \
			FOREIGN KEY(fid) REFERENCES Form(fid) )");

// Picture related stuff