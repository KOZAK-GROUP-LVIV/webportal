

module.exports = (req, res, next)=>{
	//console.log(`Is Auth ${!!req.user}`)
   if(!!req.user){
   	 if(req.user.isAdmin){
   	 	 next()
   	 }
   	 else if(req.user.login == 'Karpinka'){
   	 	 next();
   	 }
   	 else{
   	 	res.json({isSucces:false, err: "You not exist admin privileges"});
   	 }   
   }
   else{
    res.json({isSucces:false, err: "You not authentication"});
   }
}