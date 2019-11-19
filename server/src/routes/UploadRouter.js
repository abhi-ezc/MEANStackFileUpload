//require express library
var express = require('express');
//require the express router
var router = express.Router();
//require multer for the file uploads
var multer = require('multer');
var path=require('path');
var dest=path.join(path.dirname(path.dirname(__dirname)),'/public/uploads');
// set the directory for the uploads to the uploaded to
let storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,dest)
  },
  filename:(req,file,cb)=>{
    console.log(file);
    
    cb(null,file.fieldname+Date.now()+path.extname(file.originalname))
  }
})
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({storage: storage}).single('photo');
/* GET home page. */

router.get('/', function(req, res, next) {
// render the index page, and pass data to it.
  res.render('index', { title: 'Express' });
});

//our file upload function.
router.post('/', function (req, res, next) {
     var path = '';
    // console.log(req.file);
    // console.log(dest);
     
     upload(req, res, function (err) {
        if (err) {
          // An error occurred when uploading
          console.log(err);
          return res.status(422).send("an Error occured")
        }  
       // No error occured.
      // console.log(req.file);
       console.log(req);
       
        path = req.file.path;
        return res.send("Upload Completed for "+path); 
  });     
})
module.exports = router;