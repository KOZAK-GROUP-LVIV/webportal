var express = require('express');
var router = express.Router();
var usersModel = require('../models/userModel');
var newsModel = require('../models/newsModel');
var InterviewModel = require('../models/inquirerModel')
var passport = require('passport');
var authGuard = require('./guardsMiddleware/authGuard.js');
var adminGuard = require('./guardsMiddleware/adminGuard.js');
var verifGuard = require('./guardsMiddleware/verifGuard.js');






router.get('/api/getAllInterview', [authGuard, verifGuard], function(req, res, next) {

   InterviewModel.getAllInterview(req.user)
   .then(result=>{
  //  console.log(result)
     res.json({isSucces:true, result})
   }).catch(err=>{
     res.json({isSucces:false, err})
   })

});


router.get('/api/getInterview/:id', [authGuard, verifGuard], function(req, res, next) {

   InterviewModel.getInterview(req.params.id, req.user)
   .then(result=>{
    //console.log(result)
     res.json({isSucces:true, result})
   }).catch(err=>{
     res.json({isSucces:false, err})
   })

});




router.post('/api/setInterviewResult', [authGuard, verifGuard], function(req, res, next) {


   InterviewModel.setInterviewResult(req.body, req.user)
   .then(result=>{
     res.json({isSucces:true, result})
   }).catch(err=>{
     res.json({isSucces:false, err})
   })

});



router.post('/api/addInterview', adminGuard, function(req, res, next) {

   InterviewModel.addInterview(req.body, req.user)
   .then(result=>{
     res.json({isSucces:true})
   }).catch(err=>{
     res.json({isSucces:false, err})
   })

});

router.post('/api/updateInterview', adminGuard, function(req, res, next) {

   InterviewModel.updateInterview(req.body, req.user)
   .then(result=>{
    console.log(result)
     res.json({isSucces:true})
   }).catch(err=>{
     res.json({isSucces:false, err})
   })

});

router.get('/api/removeAllInterviews', adminGuard, function(req, res, next) {


   InterviewModel.removeAll()
   .then(result=>{
     res.json({isSucces:true, result})
   }).catch(err=>{
     res.json({isSucces:false, err})
   })

});


router.get('/api/removeInterview/:id', adminGuard, function(req, res, next) {

   InterviewModel.removeInterview(req.params.id)
   .then(result=>{
     res.json({isSucces:true})
   }).catch(err=>{
     res.json({isSucces:false, err})
   })

});



module.exports = router;
