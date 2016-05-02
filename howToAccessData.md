# How to use the database API  

The API functions are all in the file `dbfunctions.js` in the `db/` folder. You can require the file at the beginning and then call the functions normally, like so:

```javascript
var db = require('relative/path/to/db/dbfunctions.js');

...

db.addForm(object);
```  
You can take a look at `test/dbfunctions_test.js` for a good example.

### addForm(object)

The `addForm` function requires you to pass it a JavaScript object that follows the following format:

```javascript
establishment = {
  name = string
  owner = string
  pic = string
  inspector = string
  address = string
  town = string
  state = string
  zip = string
  phone = string
  permitNum = string
  date = string
  riskLvl = string
  prevInspectDate = string
  timeIn = string
  timeOut = string
  opType = string
  inspType = string
  haccp = boolean
  violations = []
}
```  

Each entry in the violations array should be an object in the following format:  
```javascript
violation = {
  tid = integer // this number is the number of the checkbox on the violation form
  codeRef = string
  isCrit = string // should be either C, N, or R
  description = string
  dateVerified = string
  pictures = []  // each element of this array should be a string containing a filepath
}
```  
When passing objects, it is ok to leave some fields as null.  

### searchForm(object, callback(err, rows))

This function takes two arguments, an object and a callback function. You can search for forms based on any combination of the fields 'name', 'town', and 'date'. The object you pass this function should look like this:
```javascript
  search = {
    name = string
    town = string
    date = string
  }
```  
Any or all of these fields can be blank (note that if they are all blank, the function will do nothing). Once the database rows have been retrieved, the callback function will be called. If there was an error, the 'err' variable will not be blank. Otherwise, it will be null and 'rows' will be an array containing all the database rows returned by the search.

##### Important!  
Due to the way SQLite is implemented, the database takes the form of a file called `db/inspections.db`. This database is in the github and is shared between all of us.  Be careful when merging changes on this file, as it can be blown up fairly easily.  If you do manage to screw up the database, just delete the file and then run the handy reset script:  
```bash
$ ./db/resetdb.sh
```
