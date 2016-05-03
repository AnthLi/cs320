/*
 * test sample 1
 */

var sqlite3 = require('sqlite3');
var db = require('./dbfunctions.js');

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