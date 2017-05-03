var express = require('express');
var router = express.Router();
var usersModel = require('../models/userModel');
var passport = require('passport');


/* GET users listing. */
router.post('/api/singin', function(req, res, next) {

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


router.get('/api/getProfile', (req, res, next)=>{
	req.isAuthenticated() ? next() : res.json({isSucces:false, err:'You not authentication'})
})
router.get('/api/getProfile', (req, res)=>{
	res.json({isSucces:true,user:req.user});
 });

router.get('/api/logout', (req, res, next)=>{
	 req.logout();
	 res.json({isSucces:true});
});


router.get('/api/getUsers', function(req, res, next) {
  usersModel.getUsers().then(result=>{
    res.json({isSucces:true, result})
  }).catch(err=>{
    res.json({isSucces:false, err});
  })
});

router.get('/api/addWorker/:id', function(req, res, next) {
  if(req.user.isAdmin&&String(req.user._id)==req.params.id){
    return res.json({isSucces:true});
  }
  usersModel.addWorker(req.params.id).then(result=>{
    res.json({isSucces:true, result})
  }).catch(err=>{
    res.json({isSucces:false, err});
  })
});

router.get('/api/removeWorker/:id', function(req, res, next) {
  if(req.user.isAdmin&&String(req.user._id)==req.params.id){
    return res.json({isSucces:false, err: 'This user belongs to administrators'});
  }
  usersModel.removeWorker(req.params.id).then(result=>{
    res.json({isSucces:true, result})
  }).catch(err=>{
    res.json({isSucces:false, err});
  })
});


router.get('/api/addAdmin/:id', function(req, res, next) {
  if(!req.user.isAdmin){
    return res.json({isSucces:false});
  }
  usersModel.addAdmin(req.params.id).then(result=>{
    res.json({isSucces:true, result})
  }).catch(err=>{
    res.json({isSucces:false, err});
  })
});



router.get('/api/removeUser/:id', function(req, res, next) {

  usersModel.removeUser(req.params.id).then(result=>{
    res.json({isSucces:true, result})
  }).catch(err=>{
    res.json({isSucces:false, err});
  });
  
});











module.exports = router;
