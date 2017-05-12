var express = require('express');
var router = express.Router();
var usersModel = require('../models/userModel');
var passport = require('passport');
var authGuard = require('./guardsMiddleware/authGuard.js');
var adminGuard = require('./guardsMiddleware/adminGuard.js');
var verifGuard = require('./guardsMiddleware/verifGuard.js');


var crypto = require('crypto');
var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
  destination: './',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})

var upload = multer({ storage });

  




/* GET users listing. */




router.post('/api/singin', function(req, res, next) {
  req.logout();
  usersModel.addUser(req).then(result=>{

  	res.json({isSucces:true})
  }).catch(err=>{
  	res.json({isSucces:false, err});
  });
  req.logout();
});

router.post('/api/login', 
   passport.authenticate('local', { failureRedirect: '/api/getProfile' }),
  function(req, res) {
    res.redirect('/api/getProfile');
  });



router.get('/api/getProfile', [authGuard] ,(req, res)=>{
  usersModel.findById(req.user._id).then(user=>{
      res.json({isSucces:true,user});
  }).catch(err=>{
      res.json({isSucces:false, err})
  })

 });

router.get('/api/getWorkerProfile', [authGuard, verifGuard] ,(req, res)=>{
  res.json({isSucces:true, user:req.user});
 });


router.get('/api/logout', (req, res, next)=>{
	 req.logout();
	 res.json({isSucces:true});
});


router.get('/api/getUsers', [authGuard, verifGuard], function(req, res, next) {
  usersModel.getUsers().then(result=>{
    res.json({isSucces:true, result})
  }).catch(err=>{
    res.json({isSucces:false, err});
  })
});

router.get('/api/addWorker/:id', adminGuard, function(req, res, next) {

  usersModel.addWorker(req.params.id).then(result=>{
    res.json({isSucces:true, result})
  }).catch(err=>{
    res.json({isSucces:false, err});
  })
});

router.get('/api/removeWorker/:id', adminGuard, function(req, res, next) {

  usersModel.removeWorker(req.params.id).then(result=>{
    res.json({isSucces:true, result})
  }).catch(err=>{
    res.json({isSucces:false, err});
  })
});


router.get('/api/addAdmin/:id', adminGuard, function(req, res, next) {

  usersModel.addAdmin(req.params.id).then(result=>{
    res.json({isSucces:true, result})
  }).catch(err=>{
    res.json({isSucces:false, err});
  })
});



router.get('/api/removeUser/:id', adminGuard, function(req, res, next) {

  usersModel.removeUser(req.params.id).then(result=>{
    res.json({isSucces:true, result})
  }).catch(err=>{
    res.json({isSucces:false, err});
  });
  
});


router.post('/api/editProfile', upload.single('avatar'), (req, res)=>{

   usersModel.updateProfile(req.user._id, req).then(result=>{
    res.json({isSucces:true})
   }).catch(err=>{
    res.json({isSucces:false, err})
   })


});















module.exports = router;
