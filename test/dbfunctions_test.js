/**
 * Test file for dbfunctions.js
 */

var db = require('../db/dbfunctions.js');

console.log(typeof db.addForm);
console.log(typeof db.updateForm);
console.log(typeof db.searchForm);
console.log(typeof db.removeForm);

var v1 = {
	itemNo: '345',
	codeRef: 'Sec 1, Article IV',
	isCrit: false,
	description: 'Rats, ewwww',
	dateVerified: '2016-04-22',
	vTypes: [1,5,22]
};
var v2 = {
	itemNo: '123',
	codeRef: 'Sec 3, Article II',
	isCrit: false,
	description: 'Found some things over there',
	dateVerified: '2016-04-23',
	vTypes: [3,6,9]
};
var v3 = {
	itemNo: '5673',
	codeRef: 'Sec 12, Article XLI',
	isCrit: true,
	description: 'The owner was super snooty, I don\'t like him',
	dateVerified: '1974-11-01',
	vTypes: [4,5,2,1]
}

var v4 = {
	itemNo: '2309',
	codeRef: 'Article wut, Section infinity',
	isCrit: false,
	description: 'Blue with yellow spots',
	dateVerified: '1066-01-01',
	vTypes: [1]
}

var v5 = {
	itemNo: '235',
	codeRef: 'Sec 3, Article III',
	isCrit: false,
	description: 'Is this thing still on?  How do I turn this off?',
	dateVerified: '2014-05-02',
	vTypes: [23]
}

var form = {
	name: 'Food Shoppe',
	owner: 'Mr. Smithers',
	pic: 'the dude in charge',
	inspector: 'gadget',
	address: '121 Road Lane',
	town: 'Amherst',
	state: 'MA',
	zip: '01002',
	phone: '123-456-7890',
	permitNum: '1234',
	date: '2011-01-24',
	riskLvl: 'high',
	prevInspectDate: '2010-01-24',
	timeIn: '12:30',
	timeOut: '14:45',
	opType: 'special',
	inspType: 'thorough',
	haccp: true,
	violations: [v1,v2,v3]
};

console.log('Adding:',form);
db.addForm(form);
/*
form.violations = [v4,v5];

console.log('Adding:',form);
db.addForm(form);
*/