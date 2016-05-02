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
				violations[i].tid,
				violations[i].codeRef,
				violations[i].isCrit,
				violations[i].description,
				violations[i].dateVerified];
		  var pictures = violations[i].pictures;
		  
			db.run("INSERT INTO Violation(fid,tid,codeRef,isCrit,description,dateVerified) \
					VALUES(?,?,?,?,?,?)",violation,function(){
				if(pictures){
				  insertPictures(this.lastID, pictures);
				}
			});
		}
	}

	var insertPictures = function(vid, pictures){
	  for(var i=0;i<pictures.length;i++){
	    db.run("INSERT INTO Picture(vid,filename) VALUES(?,?)",vid,pictures[i]);
	  }
	}

	db.serialize(insertForm());
}


// search forms in the database
// search on restaurant name, town, or inspection date
var searchForm = function(formObj, callback){
  
  if(!formObj.name && !formObj.town && !formObj.date){
    return;
  }
  if(typeof callback != 'function'){
    return;
  }
  
  sqlStr = "SELECT * \
            FROM Form f \
            INNER JOIN Violation v ON(v.fid=f.fid) \
            INNER JOIN Vtype t ON(t.tid=v.tid) \
            INNER JOIN Picture p ON(p.vid=v.vid) \
            WHERE ";

  if(formObj.name){
    sqlStr += "f.name="+formObj.name;
  }
  if(formObj.town){
    if(formObj.name){
      sqlStr += " AND ";
    }
    sqlStr += "f.town="+formObj.town;
  }
  if(formObj.date){
    if(formObj.town || formObj.name){
      sqlStr += " AND ";
    }
    sqlStr += "f.date="+formObj.date;
  }

    db.all(sqlStr, [], callback);
}

module.exports = {
	addForm: addForm,
	searchForm: searchForm,
}
