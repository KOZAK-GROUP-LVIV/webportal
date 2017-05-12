const crypto = require('crypto'),
	  mongoose = require('../../db/mongoose'),
	  Schema = mongoose.Schema,
      ObjectId = require('mongodb').ObjectID;





let schema1 = new Schema({  

	history : {
			type: [
					{author : {	
													
												type: Schema.Types.ObjectId,
												required: [true, '_id is required'],
												ref: 'users'
											
								},
													 
					addressee: {		
															
												type: Schema.Types.ObjectId,
												required: [true, '_id is required'],
												ref: 'users'
												
									},

						   date:{
										type: Date,
										default: Date.now()
									},
							body: {
										type:String,
										required: [true, "*messsage body is required"]
									},

							read : {
								type: [Schema.Types.ObjectId],
								default: []
							},

							isRead : {
								type:Boolean,
								default:true
							}
						}
				  ],
			default : []	

		},
	lastMessage : {
		type: {
			author : Schema.Types.ObjectId,
			text : String,
			date:Date
		}
	},
	users : {

		type: [Schema.Types.ObjectId]}

		}, {timestamps: true});



let schema2 = new Schema({  

	history : {
			type: [{
					author : {	
													
												type: Schema.Types.ObjectId,
												required: [true, '_id is required'],
												ref: 'users'
											
								},
													 
					addressee: {		
															
												type: Schema.Types.ObjectId,
												required: [true, '_id is required'],
												ref: 'users'
								},

						   date:{
										type: Date,
										default: Date.now()
									},
							body: {
										type:String,
										required: [true, "*Текст сообщение должен быть не менее 1-го символа!"]
									},
						    read : {
								type: [Schema.Types.ObjectId],
								default: []
							},
							isRead : {
								type:Boolean,
								default:true
							}
					}
				  ],
			default : []	

		},
	users : {
		type: [Schema.Types.ObjectId]

	},
	isGeneral : {
		type: Boolean,
		default: false
	}

}, {timestamps: true});




let chatDualModel =  mongoose.model('chatDualStore', schema1);
let chatMultiModel =  mongoose.model('chatMultiStore', schema2);


module.exports = function(userModel){
	var usersModel = userModel;

		return {



		chatDualModel: chatDualModel,


		setDualHistory({author, addressee, body}){
			return new Promise((res, rej)=>{
			
			let msg = {
			       author : author._id,
			       addressee : addressee._id,
			       body,
			       date : new Date(),
			       read : [author._id]
		    	};

		  	chatDualModel
		  		.findOne({$and: [{users: author._id}, {users:addressee._id}]})
			  		.then(responce=>{
			  			//console.log(responce);
			  			//console.log(' I SAVE')
			  			if(responce){
			  				chatDualModel
			  					.find({$and: [{users: author._id}, {users:addressee._id}]})
			  					.update({$push: {history:msg}, $set: {lastMessage: { author:author._id, body, date: new Date() }} }).then(responce=>{
			  					
			  						chatDualModel.aggregate( [
									{ "$match": { $and: [ { "users": ObjectId(author._id) }, { "users": ObjectId(addressee._id) } ] } },
									{ "$unwind": "$history" },
									{ "$group": {
										"_id": "$_id",
							            "history": { "$last": "$history" }
							        }}
							        
									])

									.exec((err, transactions)=>{
										if(err){
											console.log(err)
										}
										else{
											usersModel.usersModel.populate(transactions, {path: 'history.author  history.addressee'}, function(err, populatedTransactions) {
													res(populatedTransactions[0].history)
        										});
										}

									});

			  					}).catch(err=>{
			  						console.log(err)
			  						rej(err);
			  					})
			  			}
			  			else{
			  			//	console.log('CREEEATE')
			  				let dualHistory = new chatDualModel({
			  					history : [],
			  					users : [author._id, addressee._id]
			  				});

			  				dualHistory.save().then(()=>{
			  					chatDualModel
			  					.find({$and: [{users: author._id}, {users:addressee._id}]})
			  					.update({$push: {history:msg}, $set: {lastMessage: { author:author._id, body, date: new Date() }} }).then(responce=>{

			  						chatDualModel.aggregate( [
									{ "$match": { $and: [ { "users": ObjectId(author._id) }, { "users": ObjectId(addressee._id) } ] } },
									{ "$unwind": "$history" },
									{ "$group": {
										"_id": "$_id",
							            "history": { "$last": "$history" }
							        }}
									] ).exec((err, transactions)=>{
										if(err){
											console.log(err)
										}
										else{
											usersModel.usersModel.populate(transactions, {path: 'history.author  history.addressee'}, function(err, populatedTransactions) {
													res(populatedTransactions[0].history)
        										});
										}

									});

			  					})
			  				})
			  				//createDualStore
			  			}
			  		}).catch(err=>{
			  			rej(err);
			  		})

		  		})
		},

		setGeneralHistory({author, body}){
			return new Promise((resolve, reject)=>{


			let msg = {
			       author:author._id,
			       body,
			       date : new Date(),
			       read : [author._id]
		    	};
		    

		    chatMultiModel.findOne({isGeneral:true}).then(res=>{

		    	if(res){
		    		//console.log('SAVE')
		    		chatMultiModel
		    			.findOne({isGeneral:true})
			  					.update({$push: {history:msg}}).then(responce=>{

			  						chatMultiModel.aggregate( [
									{ "$match": { isGeneral:true } },
									{ "$unwind": "$history" },
									{ "$group": {
										"_id": "$_id",
							            "history": { "$last": "$history" }
							        }}	        
									])
									.exec((err, transactions)=>{
										if(err){
											console.log(err)
										}
										else{
											usersModel.usersModel.populate(transactions, {path: 'history.addressee'}, function(err, populatedTransactions) {
													resolve(populatedTransactions[0].history)
        										});
										}

									});

			  					}).catch(err=>{
			  						reject(err);
			  					})
		    	}
		    	else{
		    		// console.log('CREATE')
		    		 let generalHistory = new chatMultiModel({
		    		 	history: [],
		    		 	users: [],
		    		 	isGeneral : true
		    		 })
		    		 generalHistory.save().then(()=>{
		    		 	chatMultiModel.findOne({isGeneral:true}).update({$push: {history:msg}}).then(()=>{

		    		 		 	chatMultiModel.aggregate( [
									{ "$match": { isGeneral:true } },
									{ "$unwind": "$history" },
									{ "$group": {
										"_id": "$_id",
							            "history": { "$last": "$history" }
							        }}	        
									])
									.exec((err, transactions)=>{
										if(err){
											console.log(err)
										}
										else{
											usersModel.usersModel.populate(transactions, {path: 'history.author  history.addressee'}, function(err, populatedTransactions) {
													resolve(populatedTransactions[0].history)
        										});
										}
									});

		    		 	}).catch(err=>{
		    		 		reject(err)
		    		 	})

		    		 })
		    	}
		    })


		  });

		},

		getGeneralConferencePreview(_id){
			return new Promise((resolve, reject)=>{

					chatMultiModel.aggregate( [
									{ '$match': { isGeneral: true } }

									] ).exec((err, transactions)=>{
										if(err){
											console.log(err)
										}
										else{
											usersModel.usersModel.populate(transactions, {path: 'history.author'}, function(err, populatedTransactions) {
													let preview = {}
													
													if(populatedTransactions.length != 0){
														preview.countUnreadMessage = populatedTransactions[0].history.filter(messsage=>{
															return messsage.read.filter(id=>String(id)==String(_id)).length == 0;
														}).length;

														preview.lastMessageActions = populatedTransactions[0].history[populatedTransactions[0].history.length-1].body;
														preview.isAuthorMessageActions = String(populatedTransactions[0].history[populatedTransactions[0].history.length-1].author._id) == String(_id);
														resolve(preview)
													}
													else{
														resolve(preview);
													}						
													
        										});
										}

									});

			})
	
		},

		getGeneralHistory(myId,  pagination){

			let skip = pagination*20;

			return new Promise((resolve, reject)=>{

				chatMultiModel
		  		.findOne({isGeneral: true}, {history:{$slice:0-skip}})
		  		.exec((err, transactions)=>{
							if(err)
								return	

							usersModel.usersModel.populate(transactions, {path: 'history.author'},
								 (err, res)=> {

							res.history =  res.history.map(msg=>{
					  			 let onreadMessageId = msg._id;
					  			 msg.isRead = true;
					  			 if(msg.read.indexOf(myId)==-1){
						  					this.readMessage(onreadMessageId, null, myId, true);
  				
					  			 	}
					  			 		return msg;
		  						});
			  					
								resolve(res)
        										});

							
			   		});

			})

		},

		getDualHistory({myId, partnerId, pagination}, socket){
			console.log(`pagination -> ${pagination}`);
			console.log(`partnerId -> ${partnerId}`)

			return new Promise((resolve, reject )=>{


			let skip = pagination*20;

			return chatDualModel
		  		.findOne({$and: [{users: myId}, {users:partnerId}]}, {history:{$slice:0-skip}})
		  		.exec((err, transactions)=>{
							if(err)
								return	

							usersModel.usersModel.populate(transactions, {path: 'history.author  history.addressee'},
								 (err, res)=> {

							res.history =  res.history.map(msg=>{
					  			 let onreadMessageId = msg._id;
					  			 msg.isRead = msg.read.indexOf(partnerId) != -1;

					  			 if(String(msg.addressee._id) == String(myId)){
						  			 	let isReadReader = !(msg.read.indexOf(myId) == -1);
						  				if(!isReadReader){
						  					this.readMessage(onreadMessageId, partnerId, myId);
						  				}	  				
					  			 	}
					  			 		return msg;
		  						});

								//console.log(res);
								if(String(res.history[res.history.length-1].addressee._id)==String(myId)){
	        						  this.notifyAuthor(res.history[res.history.length-1].author._id, myId)
			  					}

			  					
								resolve(res)

        										});

							
			   });
		  		})

		},


		readMessage(onreadMessageId, authorMessage, readerId, isGeneral){
			if(!isGeneral)
			return chatDualModel.find({'history._id': onreadMessageId})
		  			 .update({$push : {"history.$.read" :  readerId}})
		  			 .then(result=>{
		  			 		//console.log(result)
			  			}).catch((err)=>{
			  				console.log(err)
			  			})
			if(isGeneral)
			return chatMultiModel.find({'history._id': onreadMessageId})
		  			 .update({$push : {"history.$.read" :  readerId}})
		  			 .then(result=>{
		  			 		console.log(result)
			  			}).catch((err)=>{
			  				//console.log(err)
			  			})

			},

		getLastMessage(){

			},

		notifyAuthor(writerId, readerId){
			usersModel.findById(writerId).then((user)=>{
		  			 	if(user.isOnline)
		  			 		io.sockets.to(user.socketId)
		  			 			.emit('readMessage', {reader: readerId, writer: writerId});

		  			 		});
			}

		}
	}









