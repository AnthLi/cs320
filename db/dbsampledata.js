/*
 * test sample 1
 */

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database(__dirname + '/inspections.db');

// Establishments
db.run("INSERT INTO Form(fid,name,owner,pic,inspector,address,town,state,zip,phone,permitNum,date,riskLvl,prevInspectDate,timeIn,timeOut,opType,inspType,haccp) VALUES \ (1,'name1','owner1','pic1','inspector1','address1','town1','state1','zip1','phone1','permitNum1','data1','riskLvl1','prevInspectDate1','timeIn1','timeOut1','opType1','inspType1','haccp1')");

db.run("INSERT INTO Form(fid,name,owner,pic,inspector,address,town,state,zip,phone,permitNum,date,riskLvl,prevInspectDate,timeIn,timeOut,opType,inspType,haccp) VALUES \ (2,'name2','owner2','pic2','inspector2','address2','town2','state2','zip2','phone2','permitNum2','data2','riskLvl2','prevInspectDate2','timeIn2','timeOut2','opType2','inspType2','haccp2')");

db.run("INSERT INTO Form(fid,name,owner,pic,inspector,address,town,state,zip,phone,permitNum,date,riskLvl,prevInspectDate,timeIn,timeOut,opType,inspType,haccp) VALUES \ (3,'name3','owner3','pic3','inspector3','address3','town3','state3','zip3','phone3','permitNum3','data3','riskLvl3','prevInspectDate3','timeIn3','timeOut3','opType3','inspType3','haccp3')");



// Violation
db.run("INSERT INTO Violation(vid,fid,codeRef,isCrit,description,FOREIGN KEY(fid) VALUES \ (1,1,'Section 1, Article 1',true,'description1','Form(fid)')");

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