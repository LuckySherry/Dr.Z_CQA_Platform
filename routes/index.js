var express = require('express');
var router = express.Router();
var url = require("url");
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' })
});
/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});
/*GET Result Page*/
/*router.get('/result',function(req,res) {
    res.redirect('/result.html');
    res.end();
});*/

/* POST to Add User Service */
router.get('/result', function(req, res) {

    // Set our internal DB variable
    var db = req.db;
    // Get our form values. These rely on the "name" attributes
    var Title = req.query.question;

    // Set our collection
   // var collection1 = db.get('raw');
    //var collection2 = dbu.get('User');
    var Data = db.collection('Raw').find({"AnswerID":"153586"});
    db.collection('User').find(/*{"UserID":"8589"}*/).limit(10).toArray(function (errU,resultU){
        db.collection('Raw').find(/*{"AnswerID":"153586"}*/).limit(4).toArray(function(err, result) {
            res.render('result',{
                title:Title,QAPair:result,RelatedUser:resultU

            });console.log(result);
        });
    });

    /*var User = db.collection('User').find({});
    db.collection('User').find({"UserID":"8589"}).toArray(function(err, result) {
        res.render('result',{
            RelatedUser:result
        });

    });
    res.render('result',{
        title:Title,data:Data,RelatedUser:User
    });*/

    /*collection1.findOne({},{},function(e,docs){
       res.render('result',{
           data:docs
       });
       console.log(docs.UserURL);
    });
    collection2.findOne({},{},function(e,docs){
        res.render('result',{
            RelatedUser:docs
        });
    });*/

});
module.exports = router;
