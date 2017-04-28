var express = require('express');
var router = express.Router();
var usersModel = require('../models/userModel');
var newsModel = require('../models/newsModel')
var passport = require('passport');



router.post('/api/setNews', function(req, res, next) {

  newsModel.setNews(req.body);
  res.json({isSucces:true})

});

router.get('/api/getNews/:id', (req, res)=>{
   
    newsModel.getNews(req.params.id).then(result=>{
    res.json({isSucces:true, result})
  }).catch(err=>{
    res.json({isSucces:false, err});
  });

});

router.get('/api/getAllNews/:pagination', (req, res)=>{

       newsModel.getAllNews(req.params.pagination).then(result=>{
    res.json({isSucces:true, result})
    }).catch(err=>{
      res.json({isSucces:false, err});
    });
     
});


router.get('/api/getAllNews', (req, res)=>{

        newsModel.getAllNews().then(result=>{
    res.json({isSucces:true, result})
    }).catch(err=>{
      res.json({isSucces:false, err});
    });
  
});


router.post('/api/updateNews', (req, res)=>{
   
    newsModel.updateNews(req.body).then(result=>{
    res.json({isSucces:true})
  }).catch(err=>{
    res.json({isSucces:false, err});
  });

});

router.get('/api/deleteNews/:id', (req, res)=>{
   
    newsModel.deleteNews(req.params.id).then(result=>{
    res.json({isSucces:true})
  }).catch(err=>{
    res.json({isSucces:false, err});
  });

});


router.get('/api/addPublisher/:id', (req, res)=>{
    console.log(req.params.id)
    newsModel.addPublisher(req.params.id).then(result=>{
    res.json({isSucces:true})
  }).catch(err=>{
    res.json({isSucces:false, err});
  });

});





module.exports = router;
