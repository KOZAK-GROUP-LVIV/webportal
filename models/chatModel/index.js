const crypto = require('crypto'),
	  mongoose = require('../../db/mongoose'),
	  Schema = mongoose.Schema,
      ObjectId = require('mongodb').ObjectID;





let schema1 = new Schema({  

	history : {
			type: [
					{author : {
										type: {
											_id: {
												type: Schema.Types.ObjectId,
												required: [true, '_id is required']
											},
											first_name : {
												type: String,
												required: [true, 'first_name is required']
											},
											last_name : {
												type: String,
												required: [true, 'last_name is required']
											},
											login : {
												type: String,
												required: [true, 'login is required']
											}
										},
										required: [true, "*author info is required"]
													},
													 
					addressee: {		
										type: {
											_id: {
												type: Schema.Types.ObjectId,
												required: [true, '_id is required']
											},
											first_name : {
												type: String,
												required: [true, 'first_name is required']
											},
											last_name : {
												type: String,
												required: [true, 'last_name is required']
											},
											login : {
												type: String,
												required: [true, 'login is required']
											}
										},
										required: [true, "*addressee info is required"]
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
					author: {
										type: {
											_id: {
												type: Schema.Types.ObjectId,
												required: [true, '_id is required']
											},
											first_name : {
												type: String,
												required: [true, 'first_name is required']
											},
											last_name : {
												type: String,
												required: [true, 'last_name is required']
											},
											login : {
												type: String,
												required: [true, 'login is required']
											}
										}
													},
													 
					addressee: {
										type:Schema.Types.ObjectId
									},

						   date:{
										type: Date,
										default: Date.now()
									},
							body: {
										type:String,
										required: [true, "*Текст сообщение должен быть не менее 1-го символа!"]
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
	console.log(`my user model`)
	console.log(userModel)

		return {



		chatDualModel: chatDualModel,


		setDualHistory({author, addressee, body}){
			return new Promise((res, rej)=>{
			

			let msg = {
			       author:{	_id: author._id,
			       			first_name: author.first_name, 
			       		    last_name : author.last_name,
			       			login : author.login},
			       addressee : {
			       			_id: addressee._id,
			       			first_name: addressee.first_name, 
			       		    last_name : addressee.last_name,
			       			login : addressee.login
			       },
			       body,
			       date : new Date(),
			       read : [author._id]
		    	};

		  	chatDualModel
		  		.findOne({$and: [{users: author._id}, {users:addressee._id}]})
			  		.then(responce=>{
			  			//console.log(responce);
			  			console.log(' I SAVE')
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
									] ).then(lastMessage=>{
										res(lastMessage);
									}).catch(err=>{
										//console.log(err);
									})

			  					}).catch(err=>{
			  						rej(err);
			  					})
			  			}
			  			else{
			  				console.log('CREEEATE')
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
									] ).then(lastMessage=>{
										res(lastMessage);
									}).catch(err=>{
									//	console.log(err);
									})

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
			       author:{	_id: author._id,
			       			first_name: author.first_name, 
			       		    last_name : author.last_name,
			       			login : author.login},
			       body,
			       date : new Date()
		    	};

		    chatMultiModel.findOne({isGeneral:true}).then(res=>{
		    //	console.log('asdasd;');
		    //	console.log(res)
		    	if(res){
		    		console.log(msg)
		    		chatMultiModel
		    			.findOne({isGeneral:true})
			  					.update({$push: {history:msg}}).then(responce=>{

			  						resolve(responce);
			  					}).catch(err=>{
			  						reject(err);
			  					})
		    	}
		    	else{
		    		 let generalHistory = new chatMultiModel({
		    		 	history: [],
		    		 	users: [],
		    		 	isGeneral : true
		    		 })
		    		 generalHistory.save().then(()=>{
		    		 	chatMultiModel.findOne({isGeneral:true}).update({$push: {history:msg}});
		    		 	resolve(responce);
		    		 })
		    	}
		    })


		  });

		},

		getGeneralHistory({padigation}){

			return chatMultiModel.find({isGeneral:true})
		},

		getDualHistory({myId, partnerId, padigation}, socket){

			
			return chatDualModel
		  		.findOne({$and: [{users: myId}, {users:partnerId}]}, 'history lastMessage').then(res=>{
		  			//console.log(`THI IS LAST MESSAGE ${res.lastMessage}`);
		  			//console.log(res)

		  			res.history =  res.history.map(msg=>{
		  			 let onreadMessageId = msg._id;
		  			// console.log(msg)

		  			 msg.isRead = msg.read.some(readerId=>{
		  					return String(readerId) == String(partnerId);
		  				});

		  			 if(String(msg.addressee._id) == String(myId)){

		  			 	let isReadReader = !(msg.read.indexOf(myId) == -1);

		  				if(!isReadReader){

		  					this.readMessage(onreadMessageId, partnerId, myId);
		  				}
		  				
		  			 }
		  			 
		  			 

		  			 return msg;
		  			});

		  			
		  			
		  		 return res;
		  		})
		},


		readMessage(onreadMessageId, authorMessage, readerId){
			chatDualModel.find({'history._id': onreadMessageId})
		  			 .update({$push : {"history.$.read" :  readerId}})
		  			 .then(result=>{
		  			 	console.log(result)
		  			 	//console.log(usersModel)
		  			 usersModel.findById(authorMessage).then((user)=>{
		  			 	console.log(`${user.login} readMessage event!`)
		  			 	if(user.isOnline){
		  			 						//	console.log(`user writer ${user.login} - socketId ${user.socketId}`)
		  			 		io.sockets.to(user.socketId).emit('readMessage', readerId);

		  			 		}
		  			 		}).catch(err=>{
		  			 			console.log(err)
		  			 		});


		  			}).catch(error=>{
		  			 	console.log(error);
		  			 })

		}

		}
	}




		/*
		searchBooks(title_or_author_segment){
			return bookModel.find()
			.or([{ title: new RegExp(title_or_author_segment, 'i', 'g')},
				 { author: new RegExp(title_or_author_segment, 'i', 'g') }])
		}

		*/







