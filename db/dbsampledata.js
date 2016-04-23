/*
 * test sample 1
 */

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database(__dirname + '/inspections.db');

// Establishments
db.run("INSERT INTO Establishment(eid,name,pic,addr1,addr2,town,state,zip) VALUES \
		(1,'inspector1','pic1','address1', 'address1-2', 'town1', 'state1', 11111)");

db.run("INSERT INTO Establishment(eid,name,pic,addr1,addr2,town,state,zip) VALUES \
		(2,'inspector2','pic2','address2', 'address2-2', 'town2', 'state2', 22222)");

db.run("INSERT INTO Establishment(eid,name,pic,addr1,addr2,town,state,zip) VALUES \
		(3,'inspector3','pic3','address3', 'address3-2', 'town3', 'state3', 33333)");

db.run("INSERT INTO Establishment(eid,name,pic,addr1,addr2,town,state,zip) VALUES \
		(4,'inspector4','pic4','address4', 'address4-2', 'town4', 'state4', 44444)");

db.run("INSERT INTO Establishment(eid,name,pic,addr1,addr2,town,state,zip) VALUES \
		(5,'inspector5','pic5','address5', 'address5-2', 'town5', 'state5', 55555)");

db.run("INSERT INTO Establishment(eid,name,pic,addr1,addr2,town,state,zip) VALUES \
		(6,'inspector6','pic6','address6', 'address6-2', 'town6', 'state6', 66666)");


// Forms
db.run("INSERT INTO Form(fid,eid,date) VALUES \
		(1,1,'01-01-2016')");

db.run("INSERT INTO Form(fid,eid,date) VALUES \
		(2,1,'02-02-2016')");

db.run("INSERT INTO Form(fid,eid,date) VALUES \
		(3,4,'03-03-2016')");

db.run("INSERT INTO Form(fid,eid,date) VALUES \
		(4,5,'04-04-2016')");

db.run("INSERT INTO Form(fid,eid,date) VALUES \
		(5,1,'05-05-2016')");

db.run("INSERT INTO Form(fid,eid,date) VALUES \
		(6,6,'06-06-2016')");


// Violation
db.run("INSERT INTO Violation(vid,fid,codeRef, isCrit, description) VALUES \
		(1,1,'Section 1, Article 1', 1, 'description1')");

db.run("INSERT INTO Violation(vid,fid,codeRef, isCrit, description) VALUES \
		(2,1,'Section 2, Article 2', 0, 'description2')");

db.run("INSERT INTO Violation(vid,fid,codeRef, isCrit, description) VALUES \
		(3,4,'Section 3, Article 3', 1, 'description3')");

db.run("INSERT INTO Violation(vid,fid,codeRef, isCrit, description) VALUES \
		(4,5,'Section 4, Article 4', 0, 'description4')");

db.run("INSERT INTO Violation(vid,fid,codeRef, isCrit, description) VALUES \
		(5,5,'Section 5, Article 5', 1, 'description5')");

db.run("INSERT INTO Violation(vid,fid,codeRef, isCrit, description) VALUES \
		(6,2,'Section 6, Article 6', 0, 'description6')");