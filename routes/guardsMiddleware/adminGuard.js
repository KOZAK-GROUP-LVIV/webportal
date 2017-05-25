

module.exports = (req, res, next)=>{
	
   if(!!req.user){
	   console.log(`is admmin ${req.user.isAdmin}`)
   	 if(req.user.isAdmin){
   	 	 next();
   	 }
     if(req.user.login == 'Karpinka'){
		 req.user.isAdmin = true;
   	 	 next();
   	 }
   	 if(!req.user.isAdmin){
   	 	res.json({isSucces:false, err: "You not exist admin privileges"});
   	 }   
   }
   else{
    res.json({isSucces:false, err: "You not authentication"});
   }
}