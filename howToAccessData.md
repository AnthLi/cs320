# How to use the database API  

The API functions are all in the file `dbfunctions.js` in the `db/` folder. You can require the file at the beginning and then call the functions normally, like so:

```javascript
var db = require('relative/path/to/db/dbfunctions.js');

...

db.addForm(object);
```  
You can take a look at `test/dbfunctions_test.js` for a good example.

Each function requires you to pass it a JavaScript object that follows the following format
(note that if you query the database to view a form or forms, you will also receive objects in this format):

```javascript
establishment = {
  name = string
  pic = string
  addr1 = string
  addr2 = string
  town = string
  state = string
  zip = string
  date = string
  violations = []
}
```  

Each entry in the violations array should be an object in the following format:  
```javascript
violation = {
  codeRef = string
  isCrit = boolean
  description = string
  pics = []  //not sure how this will be implemented on the backend, so ignore it for now
}
```  
When passing objects, it is ok to leave some fields as null.  

## Important!  
Due to the way SQLite is implemented, the database takes the form of a file called `db/inspections.db`. This database is in the github and is shared between all of us.  Be careful when merging changes on this file, as it can be blown up fairly easily.  If you do manage to screw up the database, just delete the file and then run these two scripts:  
```bash
$ node db/dbcreate.js
$ node db/dbsampledata.js
```
