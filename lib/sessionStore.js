let session = require('express-session');
let MongoStore = require('connect-mongostore')(session);
let modelChat = require('../chatModel');



let store = new MongoStore({'db': 'sessions'});
console.log(store)
module.exports = (function(store){

	return {
		sessionStore: store,
		loadSession(sid){

			return new Promise((res, rej)=>{
				this.sessionStore.load(sid , function(err, session){
					if(arguments.length==0){
						rej(null);
					}
					else{
						res(session);
					}
				})
			})
		},
		loadUser(session){
			return new Promise((res, rej)=>{
				modelChat.findUserById(session.user);
			});

		}
	}


}(store));