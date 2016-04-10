var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login',function(req,res,next){
  var renderValues={};
  renderValues.emailHasError='';
  renderValues.txtEmail='';
  renderValues.pswdHasError='';
  renderValues.errorMsgClass='';
  renderValues.errorMsgs=[];
  res.render('users/login',renderValues);
});

router.post('/login',function(req,res,next){
  var renderValues={};
  renderValues.emailHasError='';
  renderValues.txtEmail=req.body.txtEmail;
  renderValues.pswdHasError='';
  renderValues.errorMsgClass='';
  renderValues.errorMsgs=[];

  if(req.body.txtEmail==='gracepatriciap93@gmail.com'){
    if(req.body.txtPswd==='hola'){
      req.session.logged=true;
      req.session.useremail=req.body.txtEmail;
      res.redirect('/mobileindex.html');
      return;
    }else{
      renderValues.pswdHasError='has-error';
      renderValues.errorMsgClass='alert alert-danger';
      renderValues.errorMsgs.push('credenciales no son validas');
    }

  }else{
    renderValues.emailHasError='has-error';
    renderValues.errorMsgClass='alert alert-danger';
    renderValues.errorMsgs.push('credenciales no son validas');
  }

  res.render('users/login',renderValues);

  //res.redirect('/');
});

router.get('/logout', function(req, res){
    req.session.clear();
    res.status(200).json({"ok":true});
});

module.exports = router;
