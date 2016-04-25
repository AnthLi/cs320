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

// update an existing form in the database - Not implementing this at this time
/*
var updateForm = function(formObj){
    var new_establishment = [
		formObj.name,
		formObj.pic,
		formObj.addr1,
		formObj.addr2,
		formObj.town,
		formObj.state,
		formObj.zip];
    
    var new_formDate = formObj.date;
	var new_violations = formObj.violations;

    var update_form = function(formObj){
        // eid is same
        // I assume we can get the eid only from row. If not, the code can be shorter
        db.get("SELECT eid FROM Establishment WHERE name=?", formObj.name, function(err, row)){
			if(row){
                // update stablishment, sql maybe wrong
                db.run("UPDATE row SET name = ? pic= ? addr1 = ? addr2 = ? town = ? state = ? zip = ? WHERE eid = ?", new_establishment.name, new_establishment.pic, new_establishment.addr1, new_establishment.addr2, new_establishment.town, new_establishment.state, new_establishment.zip, row.eid);
                // update formDate
                db.run("UPDATE formDate... formDate = ? WHERE eid = ?", new_formDate, row.eid);
                // update violations
                db.run("UPDATE violations... violations = ? WHERE eid = ?", new_violations, row.eid);
            }
            
            else{
                // It's a new form, add it
                addForm(formObj)
            }
        }
    }
}*/


// search forms in the database
// TODO - search on restaurant name, town, or inspection date
var searchForm = function(searchObj){
/*    // search by form_name

	var searchArr = [];
	var sqlStr = "SELECT eid FROM Establishment WHERE ";
	if searchObj has name field {
		sqlStr += "name=?"
		searchArr += searchObj.name;
	}
	if searchObj has town field {
		sqlStr += "town=?";
		searchArr += searchObj.town;
	}
	...

    db.all("SELECT eid FROM Establishment WHERE name=?", searchArr, function(err, row){
        // return all rows
    });*/
}

// remove a form from the database - not implementing this at this time
/*
var removeForm = function(formObj){
    // check valid form
    db.get("SELECT eid FROM Establishment WHERE name=?",formObj.name,function(err, row){
		if(row){
			db.run("DELETE... Data in db where eid=?", formObj.eid, function()){
                // done
            }
        }else{
            // print('invalid form')
        }
    }
}*/

module.exports = {
	addForm: addForm,
	//updateForm: updateForm,
	searchForm: searchForm,
	//removeForm: removeForm
}