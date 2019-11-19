const express=require('express');
const mongoose=require("mongoose");
const cors=require('cors');
const multer=require('multer');
const path=require('path');
const bodyparser=require('body-parser');
const app=new express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended:true
}));
const uploadRouter=require('./src/routes/UploadRouter');
// app.use(function(req, res, next) {
//     //set headers to allow cross origin request.
//         res.header("Access-Control-Allow-Origin", "*");
//         res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//         next();
//     });
app.use(cors());
app.use(express.static(path.join(__dirname,'/public')));
app.post('/insert',(req,res)=>{
    //console.log(req.body);
    console.log(path.dirname(__filename));
    
    res.send({'msg':'added'});
    
})
app.use('/upload',uploadRouter);
app.all('/',(req,res)=>{
    console.log(req.path);
    console.log(req.method);
    console.log(res.type('json'));
    
    
    
})
app.listen(3000,()=>{
    console.log('app listening at 3000')
})