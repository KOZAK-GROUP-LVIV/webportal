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

router.post('/api/addUserChat', function(req, res, next) {
  usersModel.addUserChat(req.body.id).then(result=>{
    res.json({isSucces:true, result})
  }).catch(err=>{
    res.json({isSucces:false, err});
  })
});






module.exports = router;
