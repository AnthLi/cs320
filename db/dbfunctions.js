/**
 * Provide public functions for interacting with the database
 */

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database(__dirname + '/inspections.db');

// add a new form to the database
var addForm = function(formObj){
	var form = [
		formObj.name,
		formObj.owner,
		formObj.pic,
		formObj.inspector,
		formObj.address,
		formObj.town,
		formObj.state,
		formObj.zip,
		formObj.phone,
		formObj.permitNum,
		formObj.date,
		formObj.riskLvl,
		formObj.prevInspectDate,
		formObj.timeIn,
		formObj.timeOut,
		formObj.opType,
		formObj.inspType,
		formObj.haccp ];
	var violations = formObj.violations;

	var insertForm = function(){
		var sqlstr = "INSERT INTO Form(name,owner,pic,inspector,address, \
					town,state,zip,phone,permitNum,date,riskLvl, \
					prevInspectDate,timeIn,timeOut,opType,inspType,haccp) \
					VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		db.run(sqlstr,form,function(){
			insertViolations(this.lastID);
		});
	}

	var insertViolations = function(fid){
		for(var i=0;i<violations.length;i++){
			var violation = [
				fid,
				violations[i].itemNo,
				violations[i].codeRef,
				violations[i].isCrit,
				violations[i].description,
				violations[i].dateVerified];
			db.run("INSERT INTO Violation(fid,itemNo,codeRef,isCrit,description,dateVerified) \
					VALUES(?,?,?,?,?,?)",violation,function(){
				insertPictures(this.lastID);
			});
		}
	}

	var insertPictures = function(vid){
		// TODO
	}

	db.serialize(insertForm());
}


// search forms in the database
// TODO - search on restaurant name, town, or inspection date
var searchForm = function(formObj){
    // search by form_name

//	var searchArr = [];
//	var sqlStr = "SELECT eid FROM Establishment WHERE ";
//	if searchObj has name field {
//		sqlStr += "name=?"
//		searchArr += searchObj.name;
//	}
//	if searchObj has town field {
//		sqlStr += "town=?";
//		searchArr += searchObj.town;
//	}
//	...

    db.all("SELECT * FROM Form WHERE name=?", formObj.name, function(err, rows){
        // return all rows
    });
}

module.exports = {
	addForm: addForm,
	searchForm: searchForm,
}