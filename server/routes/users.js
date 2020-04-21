var express = require('express');
var router = express.Router();
var mysql=require('mysql');

/* GET users listing. */
router.post('/reg-stu', function(req, res) {
  var stuName=req.body.name;
  var rno=req.body.rno;
  var loc=req.body.loc;
  var photo=req.body.photo;

  var con=mysql.createConnection({
    'host' : 'localhost',
    'database':'recordDb',
    'user':'root',
    'password':''
  })
  con.connect(function(err,succ){
    if(err){
    res.send('db con error');
    }
 
  var q="insert into student(name,rno,loc,photo) values('"+stuName+"',' "+rno+"',' "+loc+" ','"+photo+"')";
  con.query(q,function(e,r){
    if(e){
      res.send(e);
    }else{
      res.send(r);
    }
  })
})
});
router.get('/get-stu',function(req,res){
  var con=mysql.createConnection({
    host:'localhost',
    database:'recorddb',
    user:'root',
    password:''
  })
  con.connect(function(err,succ){
    if(err)
    {
      res.send('db con error');
    }
    var q="select * from `student` ";
    con.query(q,function(e,r){
      if(e){
        res.send(e);
      }else{
        res.send(r)
      
      }
    })
  })
})


router.get('/edit-stu',function(req,res){
  var con=mysql.createConnection({
    host:'localhost',
    database:'recorddb',
    user:'root',
    password:''
  })
  con.connect(function(err,succ){
    if(err)
    {
      res.send('db con error');
    }
    var q="select * from student ";
    con.query(q,function(e,r){
      if(e){
        res.send(e);
      }else{
        res.send(r)
      
      }
    })
  })
})


router.get('/del-stu',function(req,res){
  var stuName=req.body.name;
  var rno=req.query.rno;
  var loc=req.body.loc;
  var photo=req.body.photo;

  var con=mysql.createConnection({
    host:'localhost',
    database:'recorddb',
    user:'root',
    password:''
  })
  con.connect(function(err,succ){
    if(err)
    {
      res.send('db con error');
    }
    var q="delete from student where '"+rno+"' ";
    con.query(q,function(e,r){
      if(e){
        res.send(e);
      }else{
        res.send(r)
      
      }
    })
  })
})

module.exports = router;
