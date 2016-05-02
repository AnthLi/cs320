/*
 * test sample 1
 */

var sqlite3 = require('sqlite3');
// var db = new sqlite3.Database(__dirname + '/inspections.db');
var db = require('./dbfunctions.js');

// // Establishments
// db.run("INSERT INTO Form(fid,name,owner,pic,inspector,address,town,state,zip,phone,permitNum,date,riskLvl,prevInspectDate,timeIn,timeOut,opType,inspType,haccp) VALUES \
// 		(1,'name1','owner1','pic1','inspector1','address1','town1','state1','zip1','phone1','permitNum1','data1','riskLvl1','prevInspectDate1','timeIn1','timeOut1','opType1','inspType1',1)");

// db.run("INSERT INTO Form(fid,name,owner,pic,inspector,address,town,state,zip,phone,permitNum,date,riskLvl,prevInspectDate,timeIn,timeOut,opType,inspType,haccp) VALUES \
// 		(2,'name2','owner2','pic2','inspector2','address2','town2','state2','zip2','phone2','permitNum2','data2','riskLvl2','prevInspectDate2','timeIn2','timeOut2','opType2','inspType2',0)");

// db.run("INSERT INTO Form(fid,name,owner,pic,inspector,address,town,state,zip,phone,permitNum,date,riskLvl,prevInspectDate,timeIn,timeOut,opType,inspType,haccp) VALUES \
// 		(3,'name3','owner3','pic3','inspector3','address3','town3','state3','zip3','phone3','permitNum3','data3','riskLvl3','prevInspectDate3','timeIn3','timeOut3','opType3','inspType3',1)");



// // Violation
// db.run("INSERT INTO Violation(vid, fid, tid, codeRef, isCrit, description, dateVerified) VALUES \
// 		(1, 1, 1, 'Section 1, Article 1', 1, 'description1', '01/01/2016')");

// db.run("INSERT INTO Violation(vid, fid, tid, codeRef, isCrit, description, dateVerified) VALUES \
// 		(2, 1, 2, 'Section 2, Article 2', 0 , 'description2', '05/02/2016')");

// db.run("INSERT INTO Violation(vid, fid, tid, codeRef, isCrit, description, dateVerified) VALUES \
// 		(3, 2, 3, 'Section 3, Article 3', 1 , 'description3', '01/01/1970')");

// db.run("INSERT INTO Violation(vid, fid, tid, codeRef, isCrit, description, dateVerified) VALUES \
// 		(4, 2, 4, 'Section 4, Article 4', 0 , 'description4', '01/02/2003')");

// db.run("INSERT INTO Violation(vid, fid, tid, codeRef, isCrit, description, dateVerified) VALUES \
// 		(5, 3, 5, 'Section 5, Article 5', 1 , 'description5', '03/04/2005')");

// db.run("INSERT INTO Violation(vid, fid, tid, codeRef, isCrit, description, dateVerified) VALUES \
// 		(6, 3, 6, 'Section 6, Article 6', 0 , 'description6', '05/06/2007')");

var newForm = function(name, owner, pic, inspector, address, town, state, zip,
  phone, permitNum, date, riskLvl, prevInspectDate, timeIn, timeOut, opType,
  inspType, haccp, violations, corrActions) {
  return {
    name: name,
    owner: owner,
    pic: pic,
    inspector: inspector,
    address: address,
    town: town,
    state: state,
    zip: zip,
    phone: phone,
    permitNum: permitNum,
    date: date,
    riskLvl: riskLvl,
    prevInspectDate: prevInspectDate,
    timeIn: timeIn,
    timeOut: timeOut,
    opType: opType,
    inspType: inspType,
    haccp: haccp,
    violations: violations,
    corrActions: corrActions
  }
};

var formObj = newForm(
  'Test Establishment',
  'Test Owner',
  'Test Person in Charge',
  'Test Inspector',
  '1 Test St.',
  'TestTown',
  'Testate',
  '12345',
  '1-800-NUM-TEST',
  '0001',
  '01/01/1970',
  '1',
  '01/01/1970',
  '04:20 AM',
  '04:20 PM',
  'Food Service',
  'Routine',
  1,
  [{
    tid: 1,
    codeRef: 'Test Ref',
    isCrit: 'Y',
    description: 'Test Violation',
    dateVerified: '0101/1970'
  }],
  [{description: 'Test Corretive Action'}]
);
db.addForm(formObj);