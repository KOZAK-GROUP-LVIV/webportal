

module.exports = (req, res, next)=>{
   if(!!req.user){
     next()
   	}
   else{
    res.json({isSucces:false, err: "You not authentication"});
   }
}