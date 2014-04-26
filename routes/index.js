var express = require('express');
var router = express.Router();
var url = require("url");
var path = require("path");
var exec = require('child_process').exec;

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
    if(Title.length==0){
        Title = 'Your Input Nothing';
    }
    var method = req.query.mid;
    console.log(method);
    // Set our collection
   // var collection1 = db.get('raw');
    //var collection2 = dbu.get('User');
    var Data = db.collection('Raw').find({"AnswerID":"153586"});
    var child1, child2;
    var hash1 = hashCode(Title);
    var param = '"'+Title+'" '+'E:\\LearningResource\\UROP\\FYPWebsite_Express_Ver\\tmp\\'+hash1+'tmp.json';
    var command1 = 'java -jar E:\\LearningResource\\UROP\\FYPWebsite_Express_Ver\\jar\\ExpertsFind.jar';
    var command2 = 'java -jar E:\\LearningResource\\UROP\\FYPWebsite_Express_Ver\\jar\\DrZAnswerExt.jar';

    console.log('h: '+ hash1);



    child1 = exec(command2+' '+param,function(error,stdout,stderr){
        console.log(command2+' '+param);
        console.log('stderr: '+stderr);
        console.log('stdout: ' + stdout);
        var array = JSON.parse(stdout);
        console.log("array: "+ array);
        child2 = exec(command1+' '+stdout,function(e,o,er){
            console.log('UID: ' + o);
            var user = JSON.parse(o);
            db.collection('User').find({"UserID":{$in:user}}).limit(5).toArray(function (errU,resultU){
                db.collection('Raw').find({"AnswerID":{$in:array}}).limit(10).toArray(function(err, result) {
                    res.render('result',{
                        title:Title,QAPair:result,RelatedUser:resultU

                    });//console.log(result);
                });
            });
        });

    });



});

hashCode = function(str){
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};
module.exports = router;
