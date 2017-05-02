var express = require('express');
var router = express.Router();
var usersModel = require('../models/userModel');
var newsModel = require('../models/newsModel');
var InterviewModel = require('../models/inquirerModel')
var passport = require('passport');



router.post('/api/setInterview', function(req, res, next) {

   InterviewModel.setInterview(req.body)
   .then(result=>{
     res.json({isSucces:true})
   }).catch(err=>{
     res.json({isSucces:false, err})
   })

});

router.get('/api/getAllInterview', function(req, res, next) {

   InterviewModel.getAllInterview(req.user)
   .then(result=>{
    console.log(result)
     res.json({isSucces:true, result})
   }).catch(err=>{
     res.json({isSucces:false, err})
   })

});


router.post('/api/setInterviewResult', function(req, res, next) {


   InterviewModel.setInterviewResult(req.body, req.user)
   .then(result=>{
     res.json({isSucces:true, result})
   }).catch(err=>{
     res.json({isSucces:false, err})
   })

});


router.get('/api/removeAllInterviews', function(req, res, next) {


   InterviewModel.removeAll()
   .then(result=>{
     res.json({isSucces:true, result})
   }).catch(err=>{
     res.json({isSucces:false, err})
   })

});





module.exports = router;
