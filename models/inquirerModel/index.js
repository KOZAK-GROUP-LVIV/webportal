let crypto = require('crypto'),
	mongoose = require('../../db/mongoose'),
	Schema = mongoose.Schema,
    ObjectId = require('mongodb').ObjectID,
    userModel = require('../userModel');

let schema = new Schema({  

	question : {
		type:String,
		required: [true, 'question body is required']
	},
	isMultiple : {
		type:Boolean,
		required: [true, 'interview type is required']
	},
	answers : {
		type:[{
			indexAnswer : {
				type: Number,
				required : [true, 'index answer is required']
			},
			text: {
				type:String,
				required : [true, 'answers text is required']
				},
			isTruePercent : {
				type:Number,
				default: 0
			}
		}]
	},
	
	answersResult :{
		type: [{
			_id : {
				type: Schema.Types.ObjectId,
				required : [true, 'interview _id is required']
			},
			interviewPerson: {
				type: Schema.Types.ObjectId,
				required : [true, 'author interview _id is required'],
				ref: 'users'
			},
			indexesAnswers:{
				type : Number,
				required: [true, 'answer is required']
			} 		
		}],
		default: []
	},
	countResult: {
		type:Number,
		default:0
	},
	author : {
		type: Schema.Types.ObjectId,
		required : [true, 'author _id is required'],
		ref: 'users'
	},
	isUse : {
		type:Boolean,
		default:false
	}
}, {timestamps: true});

schema.statics.refreshDocument = function(idInterview ,indexAnswer, percentResult){


	this.model('interview').findOne({_id: idInterview}).update({'answers.indexAnswer': indexAnswer}, {$set: {
						    'answers.$.isTruePercent': percentResult
						}}).then(res=>{
							console.log(res)
						}).catch(err=>{
							console.log(err)
						});

};
schema.statics.refreshResults = function(id){
		//console.log(id)
		this.model('interview').findOne({_id: id}).then(res=>{
			//console.log(res)
			let onePercent = (res.countResult+1)/100,
				answersResultMas  = res.answersResult,
				index,
				masVarianResult,
				lengthVarianResult;

				console.log(res.answers)
			res.answers.forEach(answer=>{
					//1 == 1
					//2 == 1


					lengthVarianResult = answersResultMas.filter(answersResult=>{
						console.log(`${answer.indexAnswer} == ${answersResult.indexesAnswers}`)
						return answer.indexAnswer == answersResult.indexesAnswers;
					}).length;
					if(lengthVarianResult!=0){		
						console.log(`${answer.text} -> ${lengthVarianResult}`)		
							console.log(`<->`);
						console.log(`${lengthVarianResult}/ ${onePercent}`);

						let	percentResult = (lengthVarianResult>0&&onePercent>0) ?
										 Math.round(lengthVarianResult/onePercent) : 100;

										console.log(`I set ${percentResult} result`);

						this.refreshDocument(id, answer.indexAnswer, percentResult);

					}

			});

			this.addAction(id);

		})


	};


schema.statics.getInterview = function(id, user){

	return new Promise((resolve, reject)=>{

				let query = id ? {_id: id} : {};

				interviewModel.find(query).populate('author').sort({'createdAt': -1}).then((res)=>{
					//console.log(`query - > ${query}`)
					//  console.log(res)
					  //console.log(user)
					 let isUseMas = res.map(interview=>{
								let isUse = false;
								interview.answersResult.forEach(result=>{
									if(String(result.interviewPerson) == String(user._id)){
										isUse = true;
									}
								});
								interview.isUse = isUse;
							return interview;
						});

					 resolve(isUseMas);
				}).catch(err=>{
					console.log(err)
					reject(err)
				})

			});


	};

schema.statics.addAction = function(id){


	this.model('interview').update({_id: id},
							{$inc : {
								countResult : 1
							}}).then(res=>{
								console.log(res)
							}).catch(err=>{
								console.log(err)
							})


}

let interviewModel =  mongoose.model('interview', schema);

module.exports = (function(){

	return {
		interviewModel: interviewModel,



		addInterview(data, user){
			let interview = new interviewModel({
				question: data.question,
				isMultiple: (data.isMultiple=="true"),
				answers : data.answers,
				author : user._id,
				countResult : 0,
				isUse : false
			});
			return 	interview.save();


		},


		getInterview(id, user){
			return interviewModel.getInterview(id, user);
		},

		getAllInterview(user){
			return interviewModel.getInterview(null, user);
		},

		setInterviewResult(dataResult, user){
			   let data = dataResult.map(interviewResult=>{
			       interviewResult.interviewPerson = user._id;
			       return interviewResult;
			   });

			return	new Promise((resolve, reject)=>{

				interviewModel.findOne({_id: data[0]._id}).then(interview=>{
					let isMultiple = data.length>1&&data.length!=0&&data.length>0;

					if(interview&&!interview.isMultiple){
						
						 if(isMultiple){
						 	reject("this interview is not valid");
						 }
						 else{
						 	console.log('I SAVE NO MULTIPLE')
						 	console.log(data)
						 	console.log(data[0]._id)
						 	//console.log()

						 	interviewModel.update({_id: data[0]._id, 'answersResult.interviewPerson': {$ne: user._id}}, {$pushAll: {answersResult: data}})
							 	.then(res=>{
							 		console.log(res)
							 		if(res.nModified>0){
							 			interviewModel.refreshResults(data[0]._id);
							 			resolve(res);
							 		}
							 		if(res.nModified==0){
							 			reject('This interview already use existed')
							 		}
	 		
							 	}).catch(err=>{
							 		reject(err)
							 	})
						 }
						
					}

					if(interview&&interview.isMultiple){

						 if(!isMultiple){
						 	
						 	reject("this interview is not valid");
						 }
						 else{
						 	console.log('I SAVE YES MULTIPLE')
						 	interviewModel.update({_id: data[0]._id}, {$pushAll: {answersResult: data}})
							 	.then(res=>{
							 		interviewModel.refreshResults(data[0]._id);
							 		resolve(res);
							 	}).catch(err=>{
							 		reject(err)
							 	})
						 }

					}
				})
			})
		},

		updateInterview(data, user){
			data.author = user._id;
			console.log(data)
			return interviewModel.find({_id: data._id}).update(data);
		},

		removeAll(){
			return interviewModel.find().remove();
		},

		removeInterview(id){
			return interviewModel.find({_id: id}).remove();
		}


	}


	}())
