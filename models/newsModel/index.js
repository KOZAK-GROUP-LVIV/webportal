let crypto = require('crypto'),
	mongoose = require('../../db/mongoose'),
	Schema = mongoose.Schema,
    ObjectId = require('mongodb').ObjectID,
    userModel = require('../userModel');

let schema = new Schema({  

						   author : {
											type: Schema.Types.ObjectId,
											ref: 'users',
											required: [true,  "*author title is required"]
									},
													 
						   date:  {
										type: Date,
										default: Date.now()
									},

							title: {
										type:String,
										required: [true, "*news title is required"]
									},

							excerpt: {
										type:String,
										required: [true, "*excerpt title is required"]
									}

					
	});


let newsModel =  mongoose.model('news', schema);


module.exports = (function(){

	return {

		newsModel: newsModel,


		setNews(data){
				let news = new newsModel({
					author: data.author,
					title: data.title,
					excerpt : data.excerpt
				});

				news.save(function(error) {
				    if (!error) {
				    	/*
				        Post.find({})
				            .populate('author')
				            .exec(function(error, posts) {
				                console.log(JSON.stringify(posts, null, "\t"))
				            })
				            */
				    }
			});
		},

		getNews(_id){
			return newsModel.findOne({_id}).populate('author');
		},

		getAllNews(pagination){	 

			return new Promise((res, rej)=>{
				newsModel.count({}, (err, count)=>{
					console.log(count);

					if(!err){

						let responce = {};
						if(pagination){
							newsModel.find({}).populate('author').skip((pagination-1)*10).limit(10).then(posts=>{
								responce.posts = posts;
								responce.count = count;
								res(responce);
							}).catch(err=>{
								rej(err);
							})
							}

						if(!pagination){
							newsModel.find({}).populate('author').limit(10).then(posts=>{
								responce.posts = posts;
								responce.count = count;
								res(responce);
								
							}).catch(err=>{
								rej(err);
							})
							}

						}

					else{
						rej(err);
					}


				})
			})
			
		
		},

		updateNews(data){

			return newsModel.find({_id:data._id}).update(data);
		},

		deleteNews(_id){
			
			return newsModel.find({_id}).remove();
		},
		addPublisher(_id){
		return	userModel.getUser(_id).then(user=>{
				let publisher = {_id: user._id, 
									login:user.login,
									first_name: user.first_name,
									last_name: user.last_name,
								};

			newsModel.find().update({$set: {publishers: publisher}})
			.then(res=>{
				console.log(res)
			}).catch(err=>{
				console.log(err)
			})


			})
			
		}

			}



	}());








