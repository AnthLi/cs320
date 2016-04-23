/*
 * test sample 1
 */

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database(__dirname + '/inspections.db');

// Establishments
db.run("INSERT INTO Establishment(name,pic,addr1,addr2,town,state,zip) VALUES \
		('inspector1','pic1','address1', 'address1-2', 'town1', 'state1', '11111')");

db.run("INSERT INTO Establishment(name,pic,addr1,addr2,town,state,zip) VALUES \
		('inspector2','pic2','address2', 'address2-2', 'town2', 'state2', '22222')");

db.run("INSERT INTO Establishment(name,pic,addr1,addr2,town,state,zip) VALUES \
		('inspector3','pic3','address3', 'address3-2', 'town3', 'state3', '33333')");

db.run("INSERT INTO Establishment(name,pic,addr1,addr2,town,state,zip) VALUES \
		('inspector4','pic4','address4', 'address4-2', 'town4', 'state4', '44444')");

db.run("INSERT INTO Establishment(name,pic,addr1,addr2,town,state,zip) VALUES \
		('inspector5','pic5','address5', 'address5-2', 'town5', 'state5', '55555')");

db.run("INSERT INTO Establishment(name,pic,addr1,addr2,town,state,zip) VALUES \
		('inspector6','pic6','address6', 'address6-2', 'town6', 'state6', '66666')");


// Forms
db.run("INSERT INTO Form(date) VALUES \
		('01-01-2016')");

db.run("INSERT INTO Form(date) VALUES \
		('02-02-2016')");

db.run("INSERT INTO Form(date) VALUES \
		('03-03-2016')");

db.run("INSERT INTO Form(date) VALUES \
		('04-04-2016')");

db.run("INSERT INTO Form(date) VALUES \
		('05-05-2016')");

db.run("INSERT INTO Form(date) VALUES \
		('06-06-2016')");


// Violation
db.run("INSERT INTO Violation(codeRef, isCrit, description) VALUES \
		('Section 1, Article 1', TRUE, 'description1')");

db.run("INSERT INTO Violation(codeRef, isCrit, description) VALUES \
		('Section 2, Article 2', FALSE, 'description2')");

db.run("INSERT INTO Violation(codeRef, isCrit, description) VALUES \
		('Section 3, Article 3', TRUE, 'description3')");

db.run("INSERT INTO Violation(codeRef, isCrit, description) VALUES \
		('Section 4, Article 4', FALSE, 'description4')");

db.run("INSERT INTO Violation(codeRef, isCrit, description) VALUES \
		('Section 5, Article 5', TRUE, 'description5')");

db.run("INSERT INTO Violation(codeRef, isCrit, description) VALUES \
		('Section 6, Article 6', FALSE, 'description6')");