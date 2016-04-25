/**
 * Create the database and tables if they do not already exist
 */

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database(__dirname + '/inspections.db');

db.run("CREATE TABLE IF NOT EXISTS Form( \
			fid		INTEGER PRIMARY KEY AUTOINCREMENT, \
			name	TEXT NOT NULL, \
			owner	TEXT, \
			pic		TEXT, \
			inspector TEXT, \
			address	TEXT, \
			town	TEXT, \
			state	TEXT, \
			zip		TEXT, \
			phone	TEXT, \
			permitNum TEXT, \
			date 	TEXT, \
			riskLvl	TEXT, \
			prevInspectDate TEXT, \
			timeIn	TEXT, \
			timeOut	TEXT, \
			opType	TEXT, \
			inspType TEXT, \
			haccp	BOOLEAN )");

db.run("CREATE TABLE IF NOT EXISTS Violation( \
			vid		INTEGER PRIMARY KEY AUTOINCREMENT, \
			fid		INTEGER NOT NULL, \
			codeRef	TEXT, \
			isCrit	BOOLEAN NOT NULL, \
			description TEXT NOT NULL, \
			FOREIGN KEY(fid) REFERENCES Form(fid) )");

// Picture related stuff