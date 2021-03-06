let crypto = require('crypto'),
	mongoose = require('../../db/mongoose'),
	Schema = mongoose.Schema,
    ObjectId = require('mongodb').ObjectID,
    chatDualModel = require('../chatModel')().chatDualModel,
    gravatary = require('gravatary'),
    randomstring = require("randomstring"),
    fs = require('fs');

let schema = new Schema({
						first_name:{
							type:String,
							required: [true, "*first_name is required"],
							minlength : [3, "On entry firstname minimum count 3 letters"]
						},
						last_name : {
							type:String,
							required: [true, "*last_name is required!"],
							minlength : [3, "On entry firstname minimum count 3 letters"]
						},
						login : {
							type: String,
							unique:true,
							required: [true, "*login is required"],
							minlength : [5, "On entry firstname minimum count 5 letters"]
						},
						avatar : {
							type: String,
							required: [true, "*avatar is required"]
						},
						password : {
							type: String,
							required : [true , "*password is required"],
							minlength : [7, "password is plain"],
							select: false
						},
						lastMessageActions : {
							type: String,
							default: null
						},
						countUnreadMessage: {
							type: Number,
							default: null
						},
						isUnreadLastMessageForUser :{
							type:Boolean, 
							default:null
						},
						isAuthorMessageActions: {
							type: Boolean,
							default: false
						},
						isWorker : {
							type: Boolean,
							default: false
						},
						isAdmin : {
							type :Boolean,
							default: false
						},
						isOnline : {
							type: Boolean,
							default: false
						},
						socketIds: {
							type: [],
							default: []
						}
		});


let usersModel =  mongoose.model('users', schema);
  

let model = {

		usersModel,

		addUser(req){
		  let hashstring = req.body.login || randomstring.generate(),
		      chatUser = new usersModel({
			        first_name: req.body.first_name,
			        last_name: req.body.last_name,
			        login: req.body.login,
			        password : req.body.password,
			        avatar: gravatary.default(hashstring)
		    	});
		  	return chatUser.save()
		},

		removeUser(_id){
			return usersModel.find({_id}).remove();
		},
		loginUser(user){
			return usersModel.findOne({'login':user.login}).select("+password");
		},


		addUserSocket(_id, socketId){
			console.log(_id)
			usersModel.findOne({_id}).update({$push : {socketIds: socketId}}).then((res)=>{
				console.log(res)
			}).catch(err=>{
				console.log(err)
			})
		},

		removeUserSocket(_id, socketId){
			return new Promise((resolve, reject)=>{
					usersModel.findOne({_id}).update({$pull : {socketIds: socketId}}).then((res)=>{
							usersModel.findOne({_id}).then(user=>{
								if(user.socketIds.length==0)
								resolve(true)
								else
								resolve(false)
							});
						console.log('DELETESOCKETS')
						console.log(res)
					}).catch(err=>{
						console.log(err)
					})
			})
		
		},

		removeAllSockets(){
			return usersModel.find({}).then((users)=>{
			
				users.forEach(user=>{
					usersModel.find({_id:user._id}).update({ $set: { socketIds : [] }}).then(res=>{
						//console.log(res)
					}).catch(err=>{
						//console.log(err)
					})
				});
			})
		},
		getUsersChat(socket){
			if(socket){
				return new Promise((res, rej)=>{
					usersModel.findByIdAndUpdate(socket.user._id, {"isOnline": true, "socketId": socket.id}, function(err, model) {
					
					if(!err){					
						usersModel.find({$and: [{isWorker:true},  {_id: {$ne: socket.user._id} }] }).then(users=>{
							
							let partnerIdMas = users.map(user=>{
										return {users: user._id}
									}),
								usersMas = users
							
							chatDualModel
					  		.find({$and: [{users: socket.user._id}, {$or:partnerIdMas}]}).exec((err, dialogs)=>{


					  				let masInfo = [];
					  			 	usersMas.forEach(user=>{
					  					let newUser = user;
					  					dialogs.forEach(dialog=>{
					  						if(dialog.users.indexOf(user._id)!=-1){
					  								//console.log(dialog.history)
					  								if(dialog.history.length!=0){
					  									newUser.isAuthorMessageActions = dialog.lastMessage.author==socket.user._id;
					  									newUser.lastMessageActions = dialog.lastMessage.body;
					  									newUser.countUnreadMessage = dialog.history.filter(message=>{
					  										return message.read.indexOf(socket.user._id) == -1;
					  									}).length;
					  									newUser.isUnreadLastMessageForUser = dialog.history[(dialog.history.length-1)].read.length == 1	
					  													 && dialog.history[(dialog.history.length-1)].read.indexOf(socket.user._id) != -1;


					  								}
					  								else{
					  									newUser.msgActions.push({});
					  								}
					  								
					  						}
					  					})

					  					return masInfo.push(newUser);
					  				});
					  				res(masInfo);		
					  		})

						}).catch(err=>{
							console.log(err)
						})
					
					}
				})

				})
			}
			else{
				return usersModel.find({isWorker:true});
			}
		},
		addWorker(id){
			return usersModel.findOne({_id: id}).update({isWorker:true}).then(res=>{
					usersModel.findOne({_id: id}).then(user=>{
						if(user.isOnline){
							if(global.io){
								io.sockets.connected[user.socketId].disconnect();
							}
						}
				});
			})
		
		},
		removeWorker(id){
			return usersModel.find({_id: id}).update({isWorker:false}).then(res=>{
					usersModel.findOne({_id: id}).then(user=>{
						if(user.isOnline){
							if(global.io){
								io.sockets.connected[user.socketId].disconnect();
							}
						}
				});
			})
		},

		findById(id){
			return usersModel.findById(id);
		},

		addAdmin(id){
			return usersModel.find({_id: id}).update({isAdmin:true});
		},

		removeAdmin(id){
			return usersModel.find({_id: id}).update({isAdmin:false});
		},

		getUserById(id){
			return usersModel.findOne({_id: id});
		},

		getUsers(){
			return usersModel.find();
		},
		getFullUsersChat(socket){
			return usersModel.find({$and: [{isWorker:true, isOnline: true},  {_id: {$ne: socket.user._id} }] })
		},

		closeSocket(socket, isLogout){
		 return	new Promise((resolve, reject)=>{

			this.removeUserSocket(socket.user._id, socket.user.socketId).then((isEmpty)=>{
					if(isEmpty||isLogout){
						usersModel.findByIdAndUpdate(socket.user._id, {isOnline: false, socketId: null}, {new: true}, function(err, model) {
						if(!err){
							resolve(true)
						}
						if(err){
							reject(err)
						}
						})
					}
					else{
						resolve(false);
					}
				});	

			});	
		},

		generateAvatars(){
			return usersModel.find({isWorker:true}).then(workers=>{
				workers.forEach(worker=>{
					let hashstring = gravatary.default(worker.login, {margin: 0.08, size: 50, background: [0, 0, 0]});
					usersModel.update({_id:worker._id}, {avatar: hashstring}).then(res=>{
						console.log(res)
					}).catch(err=>{
						console.log(err)
					})

				});

			})
		},

		updateProfile(_id, req){

				return new Promise((res, rej)=>{

					if(req.file){
						

					  fs.readFile(req.file.path, (err, data)=>{
	                                  var randomName = randomstring.generate(7);

				  		fs.writeFile(`./public/images/avatars/${randomName}.png`, data, (err)=> {
				                                   if(err) {
				                                       return rej(err)
				                                        }
				                                        req.body.avatar = `/images/avatars/${randomName}.png`;
				                                        this.editProfile(_id, req.body).then(result=>{
				                                        	res( this.findById({_id}) );
				                                        }).catch(err=>{
				                                        	rej(err)
				                                        });
														
				                                                          
				                                 });

				   			 });
					  }
					if(!req.file){
						this.editProfile(_id, req.body).then(result=>{
				                                        	res(result)
				                                        }).catch(err=>{
				                                        	rej(err)
				                                        });
				                   }

				});
		},


		editProfile(_id, data){
			return usersModel.update({_id : _id}, data).then(()=>{
				usersModel.findById(_id).then(user=>{
					if(user.isOnline){
						io.sockets.connected[user.socketId].disconnect()
					}
				})
			})

		}

};


global.usr = model;
module.exports  = model;


