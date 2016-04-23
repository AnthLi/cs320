/**
 * Provide public functions for interacting with the database
 */

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database(__dirname + '/inspections.db');

// add a new form to the database
public addForm(var formObj){
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

	db.serialize(function(){
		db.run("INSERT INTO Establishment(name,pic,addr1,addr2,town,state,zip) VALUES(?,?,?,?,?,?,?)",establishment,function(){
			db.run("INSERT INTO Form(eid,date) VALUES(?,?)",[this.lastID,formDate],function(){
				var fid = this.lastID;
				for(var i=0;i<violations.length;i++){
					var violation = [
						fid,
						violations[i].codeRef,
						violations[i].isCrit,
						violations[i].description];
					db.run("INSERT INTO Violation(fid,codeRef,isCrit,description) VALUES(?,?,?,?)",violation,function(){
						// picture related stuff goes here
					});
				}
			});
		});
	});
}

// update an existing form in the database
public updateForm(){

}

// search forms in the database
public searchForm(){

}

// remove a form from the database
public removeForm(){

}