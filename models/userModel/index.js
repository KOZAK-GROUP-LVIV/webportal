let crypto = require('crypto'),
	mongoose = require('../../db/mongoose'),
	Schema = mongoose.Schema,
    ObjectId = require('mongodb').ObjectID,
    chatDualModel = require('../chatModel').chatDualModel;


let schema = new Schema({
						first_name:{
							type:String,
							required: [true, "*Фамилия не указана!"],
							minlength : [3, "Не меньше 3-х символов."]
						},
						last_name : {
							type:String,
							required: [true, "*Имя не указано!"],
							minlength : [3, "Не меньше 3-х символов."]
						},
						login : {
							type: String,
							unique:true,
							required: [true, "*Логин не указан!"],
							minlength : [5, "Слишком коротный логин."]
						},
						avatar : {
							type: String,
							required: [true, "*Аватар обьязателен!"]
						},
						password : {
							type: String,
							required : [true , "*Пароль обьзателен"],
							minlength : [7, "Слишком коротный пароль."]
						},
						msgActions : {
							type: [],
							default : []
						},
						isAuthorMsgActions: {
							type: Boolean,
							default: false
						},
						isWorker : {
							type: Boolean,
							default: false
						},
						isOnline : {
							type: Boolean,
							default: false
						},
						socketId: {
							type: String,
							default: null
						},
						news : [{type: Schema.Types.ObjectId, ref: 'newsModel'}]
		});

	schema.statics.addSocisActions = function(dataMsg){
		let authorInfo = this.model('chat').findById(dataMsg.idAuthor),
			addresseeInfo = this.model('chat').findById(dataMsg.idAddressee);

		return Promise.all([authorInfo, addresseeInfo]).then(usersInfo=>{
			return {
				author : usersInfo[0],
				addressee : usersInfo[1]
			}
		});
	};




let usersModel =  mongoose.model('users', schema);
module.exports = (function(){

	return {


		addSocisActions(idDual){
			Promise.all(
					[userModel.update({_id: dataMsg.idAuthor}, {$push: field}),
					userModel.update({_id: dataMsg.idAddressee}, {$push: field})]
						)
		},

		addUser(req){
		  let chatUser = new usersModel({
			        first_name: req.body.first_name,
			        last_name: req.body.last_name,
			        login: req.body.login,
			        password : req.body.password,
			        avatar: '/default-icon.png',
			        isWorker : true
		    	});
		  	return chatUser.save()
		},
		loginUser(user){
			return usersModel.findOne({'login':user.login});
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
					  			console.log(dialogs);

							let masInfo = [];
					  			 usersMas.forEach(user=>{
					  					let newUser = user;
					  					dialogs.forEach(dialog=>{
					  						if(dialog.users.indexOf(user._id)!=-1){

					  								newUser.isAuthorMsgActions = dialog.history[dialog.history.length-1].author._id==socket.user._id;
					  								newUser.msgActions.push(dialog.history[dialog.history.length-1]);
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
		addUserChat(id){
			return usersModel.find({_id: id}).update({isWorker:true});
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
		getUser(_id){
			return usersModel.find({isWorker:true});
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

}
}())


