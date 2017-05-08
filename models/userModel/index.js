let crypto = require('crypto'),
	mongoose = require('../../db/mongoose'),
	Schema = mongoose.Schema,
    ObjectId = require('mongodb').ObjectID,
    chatDualModel = require('../chatModel')().chatDualModel;


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
						socketId: {
							type: String,
							default: null
						}
		});


let usersModel =  mongoose.model('users', schema);
  

let model = {


		addUser(req){
		  let chatUser = new usersModel({
			        first_name: req.body.first_name,
			        last_name: req.body.last_name,
			        login: req.body.login,
			        password : req.body.password,
			        avatar: '/default-icon.png'
		    	});
		  	return chatUser.save()
		},

		removeUser(_id){
			return usersModel.find({_id}).remove();
		},
		loginUser(user){
			return usersModel.findOne({'login':user.login}).select("+password");
		},

		getUsersChat(socket){
			if(socket){
				return new Promise((res, rej)=>{
					usersModel.findByIdAndUpdate(socket.user._id, {"isOnline": true, "socketId": socket.id}, function(err, model) {
					//console.log(model);
					if(!err){
						
						usersModel.find({isWorker:true}).then(users=>{
							let partnerIdMas = users.filter(user=>{
										return user._id!= socket.user._id;
									}).map(user=>{
										return {users: user._id}
									}),

								usersMas = users.filter(user=>{
										return user._id!= socket.user._id;
									});
							
							//console.log(partnerIdMas)
							//chatDualModel.find({}).remove().then(res=>{
							//console.log(res);

							chatDualModel
					  		.find({$and: [{users: socket.user._id}, {$or:partnerIdMas}]}).exec((err, dialogs)=>{
					  			//console.log(dialogs);
					  			//console.log(socket.user._id)

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
		getFullUsersChat(){
			return usersModel.find({isWorker:true})
		},

		offlineUser(socket){

			return new Promise((res, rej)=>{
					usersModel.findByIdAndUpdate(socket.user._id, {isOnline: false, socketId: null}, {new: true}, function(err, model) {
					if(!err){
						res(model)
					}
					if(err){
						rej(err)
					}
				})
			})
		
		}

};


global.usr = model;
module.exports  = model;


