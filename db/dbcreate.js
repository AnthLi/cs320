/**
 * Create the database and tables if they do not already exist
 */

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database(__dirname + '/inspections.db');


db.serialize(function(){
db.run("CREATE TABLE IF NOT EXISTS Form( \
			fid								INTEGER PRIMARY KEY AUTOINCREMENT, \
			name							TEXT NOT NULL, \
			owner							TEXT, \
			pic								TEXT, \
			inspector 				TEXT, \
			address						TEXT, \
			town							TEXT, \
			state							TEXT, \
			zip								TEXT, \
			phone							TEXT, \
			permitNum 				TEXT, \
			date 							TEXT, \
			riskLvl						TEXT, \
			prevInspectDate		TEXT, \
			timeIn						TEXT, \
			timeOut						TEXT, \
			opType						TEXT, \
			inspType 					TEXT, \
			haccp							BOOLEAN )");

db.run("CREATE TABLE IF NOT EXISTS Violation( \
			vid								INTEGER PRIMARY KEY AUTOINCREMENT, \
			fid								INTEGER NOT NULL, \
			tid								INTEGER NOT NULL, \
			codeRef						TEXT, \
			isCrit						TEXT NOT NULL, \
			description				TEXT NOT NULL, \
			dateVerified			TEXT, \
			FOREIGN KEY(fid)	REFERENCES Form(fid), \
			FOREIGN KEY(tid)	REFERENCES Vtype(tid) )");

db.run("CREATE TABLE IF NOT EXISTS CorrectiveActions( \
			caid							INTEGER PRIMARY KEY AUTOINCREMENT, \
			fid								INTEGER NOT NULL, \
			description				TEXT NOT NULL, \
			FOREIGN KEY(fid)	REFERENCES Form(fid) )");

db.run("CREATE TABLE IF NOT EXISTS Vtype( \
			tid		INTEGER PRIMARY KEY, \
			type	TEXT NOT NULL )");

db.run("CREATE TABLE IF NOT EXISTS Picture( \
			pid								INTEGER PRIMARY KEY AUTOINCREMENT, \
			vid								INTEGER NOT NULL, \
			filename					TEXT NOT NULL, \
			FOREIGN KEY(vid)	REFERENCES Violation(vid) )");

// Fill Vtype with necessary values
db.run("INSERT INTO Vtype VALUES(1, 'PIC Assigned')");
db.run("INSERT INTO Vtype VALUES(2, 'Reporting of Diseases by Food Employee and PIC')");
db.run("INSERT INTO Vtype VALUES(3, 'Personnel with Infections Restricted/Excluded')");
db.run("INSERT INTO Vtype VALUES(4, 'Food and Water from Approved Source')");
db.run("INSERT INTO Vtype VALUES(5, 'Receiving/Condition')");
db.run("INSERT INTO Vtype VALUES(6, 'Tags/Records/Accuracy of Ingredient Statements')");
db.run("INSERT INTO Vtype VALUES(7, 'Conformance with Approved Procedures/HACCP Plans')");
db.run("INSERT INTO Vtype VALUES(8, 'Separation/Segregation/Protection')");
db.run("INSERT INTO Vtype VALUES(9, 'Food Contact Surface Cleaning and Sanitizing')");
db.run("INSERT INTO Vtype VALUES(10, 'Proper Adquate Handwashing')");
db.run("INSERT INTO Vtype VALUES(11, 'Good Hygenic Practices')");
db.run("INSERT INTO Vtype VALUES(12, 'Prevention of Contamination')");
db.run("INSERT INTO Vtype VALUES(13, 'Handwash Facilities')");
db.run("INSERT INTO Vtype VALUES(14, 'Approved Food or Color Additives')");
db.run("INSERT INTO Vtype VALUES(15, 'Toxic Chemicals')");
db.run("INSERT INTO Vtype VALUES(16, 'Cooking Temperature')");
db.run("INSERT INTO Vtype VALUES(17, 'Reheating')");
db.run("INSERT INTO Vtype VALUES(18, 'Cooling')");
db.run("INSERT INTO Vtype VALUES(19, 'Hot and Cold Holding')");
db.run("INSERT INTO Vtype VALUES(20, 'Time as a Public Health Control')");
db.run("INSERT INTO Vtype VALUES(21, 'Food and Food Preparation for HSP')");
db.run("INSERT INTO Vtype VALUES(22, 'Posting of Consumer Advisories')");

});
