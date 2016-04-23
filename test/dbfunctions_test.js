/**
 * Test file for dbfunctions.js
 */

var db = require('../db/dbfunctions.js');

console.log(typeof db.addForm);
console.log(typeof db.updateForm);
console.log(typeof db.searchForm);
console.log(typeof db.removeForm);

var v1 = {
	codeRef: 'Sec 1, Article IV',
	isCrit: false,
	description: 'Rats, ewwww'
};
var v2 = {
	codeRef: 'Sec 3, Article II',
	isCrit: false,
	description: 'Found some things over there'
};
var v3 = {
	codeRef: 'Sec 12, Article XLI',
	isCrit: true,
	description: 'The owner was super snooty, I don\'t like him'
}

var form = {
	name: 'New Restaurant',
	pic: 'Herr Bismarck',
	addr1: 'The Str333ts',
	town: 'Amherst',
	state: 'MA',
	zip: '01002',
	date: '04-23-2016',
	violations: [v1,v2,v3]
};

console.log('Adding: '+form);
db.addForm(form);