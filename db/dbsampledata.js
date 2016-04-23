/**
 * Fill the database with sample data
 */

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database(__dirname + '/inspections.db');

// Establishments
db.run("INSERT INTO Establishment(eid,name,pic,addr1,addr2,town,state,zip) VALUES \
		(1,'Bubs Barbeque','Joe Schmo','121 Road St', NULL, 'Sunderland', 'MA', '12345')");
db.run("INSERT INTO Establishment(eid,name,pic,addr1,addr2,town,state,zip) VALUES \
		( ... )");
db.run("INSERT INTO Establishment(eid,name,pic,addr1,addr2,town,state,zip) VALUES \
		( ... )");
db.run("INSERT INTO Establishment(eid,name,pic,addr1,addr2,town,state,zip) VALUES \
		( ... )");
db.run("INSERT INTO Establishment(eid,name,pic,addr1,addr2,town,state,zip) VALUES \
		( ... )");

// Forms
db.run("INSERT INTO Form(fid, eid, date) VALUES \
		(1,1,'01-23-2011')");
db.run("INSERT INTO Form(fid, eid, date) VALUES \
		( ... )");
db.run("INSERT INTO Form(fid, eid, date) VALUES \
		( ... )");
db.run("INSERT INTO Form(fid, eid, date) VALUES \
		( ... )");
db.run("INSERT INTO Form(fid, eid, date) VALUES \
		( ... )");

// Violation
db.run("INSERT INTO Violation(vid, fid, codeRef, isCrit, description) VALUES \
		(1,1,'Section 7, Article XV', TRUE, 'I found some rats, ew gross')");
db.run("INSERT INTO Violation(vid, fid, codeRef, isCrit, description) VALUES \
		( ... )");
db.run("INSERT INTO Violation(vid, fid, codeRef, isCrit, description) VALUES \
		( ... )");
db.run("INSERT INTO Violation(vid, fid, codeRef, isCrit, description) VALUES \
		( ... )");
db.run("INSERT INTO Violation(vid, fid, codeRef, isCrit, description) VALUES \
		( ... )");