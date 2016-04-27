/**
 * Create the database and tables if they do not already exist
 */

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database(__dirname + '/inspections.db');

db.run("CREATE TABLE IF NOT EXISTS Form( \
			fid				INTEGER PRIMARY KEY AUTOINCREMENT, \
			name			TEXT NOT NULL, \
			owner			TEXT, \
			pic				TEXT, \
			inspector 		TEXT, \
			address			TEXT, \
			town			TEXT, \
			state			TEXT, \
			zip				TEXT, \
			phone			TEXT, \
			permitNum 		TEXT, \
			date 			TEXT, \
			riskLvl			TEXT, \
			prevInspectDate TEXT, \
			timeIn			TEXT, \
			timeOut			TEXT, \
			opType			TEXT, \
			inspType 		TEXT, \
			haccp			BOOLEAN )");

db.run("CREATE TABLE IF NOT EXISTS Violation( \
			vid				INTEGER PRIMARY KEY AUTOINCREMENT, \
			fid				INTEGER NOT NULL, \
			itemNo			TEXT, \
			codeRef			TEXT, \
			isCrit			BOOLEAN NOT NULL, \
			description 	TEXT NOT NULL, \
			dateVerified 	TEXT, \
			FOREIGN KEY(fid) REFERENCES Form(fid) )");

db.run("CREATE TABLE IF NOT EXISTS Vtype( \
			tid		INTEGER PRIMARY KEY, \
			type 	TEXT NOT NULL )");

db.run("CREATE TABLE IF NOT EXISTS xViolationVtype( \
			vid	INTEGER NOT NULL, \
			tid	INTEGER NOT NULL, \
			FOREIGN KEY(vid) REFERENCES Violation(vid), \
			FOREIGN KEY(tid) REFERENCES Vtype(tid) )");

db.run("CREATE TABLE IF NOT EXISTS Picture( \
			pid 		INTEGER PRIMARY KEY AUTOINCREMENT, \
			filename	TEXT NOT NULL )");

// Fill Vtype with necessary values
db.run("INSERT INTO Vtype(tid,type) VALUES(1,'PIC Assigned')");
db.run("INSERT INTO Vtype(tid,type) VALUES(2,'Reporting of Diseases by Food Employee and PIC')");
db.run("INSERT INTO Vtype(tid,type) VALUES(3,'Personnel with Infections Restricted/Excluded')");
db.run("INSERT INTO Vtype(tid,type) VALUES(4,'Food and Water from Approved Source')");
db.run("INSERT INTO Vtype(tid,type) VALUES(5,'Receiving/Condition')");
db.run("INSERT INTO Vtype(tid,type) VALUES(6,'Tags/Records/Accuracy of Ingredient Statements')");
db.run("INSERT INTO Vtype(tid,type) VALUES(7,'Conformance with Approved Procedures/HACCP Plans')");
db.run("INSERT INTO Vtype(tid,type) VALUES(8,'Separation/Segregation/Protection')");
db.run("INSERT INTO Vtype(tid,type) VALUES(9,'Food Contact Surface Cleaning and Sanitizing')");
db.run("INSERT INTO Vtype(tid,type) VALUES(10,'Proper Adquate Handwashing')");
db.run("INSERT INTO Vtype(tid,type) VALUES(11,'Good Hygenic Practices')");
db.run("INSERT INTO Vtype(tid,type) VALUES(12,'Prevention of Contamination')");
db.run("INSERT INTO Vtype(tid,type) VALUES(13,'Handwash Facilities')");
db.run("INSERT INTO Vtype(tid,type) VALUES(14,'Approved Food or Color Additives')");
db.run("INSERT INTO Vtype(tid,type) VALUES(15,'Toxic Chemicals')");
db.run("INSERT INTO Vtype(tid,type) VALUES(16,'Cooking Temperature')");
db.run("INSERT INTO Vtype(tid,type) VALUES(17,'Reheating')");
db.run("INSERT INTO Vtype(tid,type) VALUES(18,'Cooling')");
db.run("INSERT INTO Vtype(tid,type) VALUES(19,'Hot and Cold Holding')");
db.run("INSERT INTO Vtype(tid,type) VALUES(20,'Time as a Public Health Control')");
db.run("INSERT INTO Vtype(tid,type) VALUES(21,'Food and Food Preparation for HSP')");
db.run("INSERT INTO Vtype(tid,type) VALUES(22,'Posting of Consumer Advisories')");