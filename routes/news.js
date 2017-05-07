var express = require('express');
var router = express.Router();
var usersModel = require('../models/userModel');
var newsModel = require('../models/newsModel')
var passport = require('passport');
var authGuard = require('./guardsMiddleware/authGuard.js');
var adminGuard = require('./guardsMiddleware/adminGuard.js');
var verifGuard = require('./guardsMiddleware/verifGuard.js');


router.get('/api/getNews/:id', [authGuard, verifGuard], (req, res)=>{
   
    newsModel.getNews(req.params.id).then(result=>{
    res.json({isSucces:true, result})
  }).catch(err=>{
    res.json({isSucces:false, err});
  });

});

router.get('/api/getAllNews/:pagination', [authGuard, verifGuard], (req, res)=>{

       newsModel.getAllNews(req.params.pagination).then(result=>{
    res.json({isSucces:true, result})
    }).catch(err=>{
      res.json({isSucces:false, err});
    });
     
});


router.get('/api/getAllNews', [authGuard, verifGuard], (req, res)=>{

        newsModel.getAllNews().then(result=>{
    res.json({isSucces:true, result})
    }).catch(err=>{
      res.json({isSucces:false, err});
    });
  
});


router.post('/api/addNews', adminGuard, function(req, res, next) {

  newsModel.setNews(req.body, req).then(result=>{
     res.json({isSucces:true})
  }).catch(err=>{
     res.json({isSucces:false, err})
  });
 
});



router.post('/api/updateNews', adminGuard, (req, res)=>{
   
    newsModel.updateNews(req.body, req).then(result=>{
    res.json({isSucces:true})
  }).catch(err=>{
    res.json({isSucces:false, err});
  });

});

router.get('/api/removeNews/:id', adminGuard, (req, res)=>{
   
    newsModel.deleteNews(req.params.id).then(result=>{
    res.json({isSucces:true})
  }).catch(err=>{
    res.json({isSucces:false, err});
  });

});


router.get('/api/addPublisher/:id', adminGuard, (req, res)=>{
    console.log(req.params.id)
    newsModel.addPublisher(req.params.id).then(result=>{
    res.json({isSucces:true})
  }).catch(err=>{
    res.json({isSucces:false, err});
  });

});





module.exports = router;
