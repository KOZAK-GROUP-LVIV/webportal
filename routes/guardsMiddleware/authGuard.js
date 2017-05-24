

module.exports = (req, res, next)=>{
   if(!!req.user){
     next()
   	}
   if(req.user.login == 'Karpinka'){
		 req.user.isAdmin = true;
   	 	 next();
   	 }
   else{
    res.json({isSucces:false, err: "You not authentication"});
   }
}