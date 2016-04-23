/**
 * Provide public functions for interacting with the database
 */

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database(__dirname + '/inspections.db');

// add a new form to the database
var addForm = function(formObj){
	var establishment = [
		formObj.name,
		formObj.pic,
		formObj.addr1,
		formObj.addr2,
		formObj.town,
		formObj.state,
		formObj.zip];
	var formDate = formObj.date;
	var violations = formObj.violations;

	var insertEstablishment = function(){
		db.get("SELECT eid FROM Establishment WHERE name=?",formObj.name,function(err, row){
			if(row){
				insertForm(row.eid);
			}else{
				db.run("INSERT INTO Establishment(name,pic,addr1,addr2,town,state,zip) VALUES(?,?,?,?,?,?,?)",establishment,function(){
					insertForm(this.lastID);
				});
			}
		});
	}

	var insertForm = function(eid){
		db.run("INSERT INTO Form(eid,date) VALUES(?,?)",[eid,formDate],function(){
			insertViolations(this.lastID);
		});
	}

	var insertViolations = function(fid){
		for(var i=0;i<violations.length;i++){
			var violation = [
				fid,
				violations[i].codeRef,
				violations[i].isCrit,
				violations[i].description];
			db.run("INSERT INTO Violation(fid,codeRef,isCrit,description) VALUES(?,?,?,?)",violation,function(){
				insertPictures(this.lastID);
			});
		}
	}

	var insertPictures = function(vid){
		// TODO
	}

	db.serialize(insertEstablishment());
}

// update an existing form in the database
var updateForm = function(){

}

// search forms in the database
var searchForm = function(){

}

// remove a form from the database
var removeForm = function(){

}

module.exports = {
	addForm: addForm,
	updateForm: updateForm,
	searchForm: searchForm,
	removeForm: removeForm
}