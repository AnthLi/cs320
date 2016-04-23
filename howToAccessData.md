# How to use the database API  

The actual functions that you are passing to have not yet been written and therefore are still unnamed.
Once I know what they are called I will update this with their names.  
If you want to save a form to the databse, pass a JavaScript object that follows the following format
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
IDs may or may not also come into play later, but don't worry about them for now.
