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
	}
	answers : {
		type:[{
			indexAnswer : {
				type: [Number],
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
	date : {
		type:Date,
		default: Date.now()
	},
	
	answersResult :{
		type: [{
			interviewsPersons: {
				type: [Schema.Types.ObjectId],
				required : [true, 'author interview _id is required']
				ref: 'users'
			},
			indexesAnswers:{
				type : [Number],
				required: [true, 'answer is required']
			} 		
		}],
		default: []
	},
	author : {
		type: Schema.Types.ObjectId,
		required : [true, 'author _id is required']
		ref: 'users'
	}
});


schema.statics.refreshResults = function(){
		let authorInfo = this.model('chat').findById(dataMsg.idAuthor),
			addresseeInfo = this.model('chat').findById(dataMsg.idAddressee);

		return Promise.all([authorInfo, addresseeInfo]).then(usersInfo=>{
			return {
				author : usersInfo[0],
				addressee : usersInfo[1]
			}
		});
	};

let interviewModel =  mongoose.model('interview', schema);

module.exports = (function(){

	return {
		interviewModel: interviewModel,



		setInterview(data){
			let interview = new interviewModel(data);
			return 	interview.save();


		},

		getAllInterview(){
			return interviewModel.find();
		},

		setInterviewResult(data){
			return	new Promise((resolve, reject)=>{
				interviewModel.find({_id: data._id}).then(interview=>{
					if(interview&&!interview.isMultiple){
						let isMultiple=0;
						 data.answers.forEach(answer=>{
						 	if(answer.isTrue)
						 		isMultiple++
						 });
						 if(isMultiple>1||isMultiple<1){
						 	rej("this interview is not valid");
						 }
						 else{
						 	interviewModel.find({_id: data._id}).update({$push: {answers: data}})
							 	.then(res=>{
							 		interviewModel.refreshResults();
							 		resolve(res);
							 	}).catch(err=>{
							 		reject(err)
							 	})
						 }
						
					}
					if(interview&&!interview.isMultiple){
						let isMultiple=0;
						 data.answers.forEach(answer=>{
						 	if(answer.isTrue)
						 		isMultiple++
						 });
						 if(isMultiple<1){
						 	rej("this interview is not valid");
						 }
						 else{
						 	interviewModel.find({_id: data._id}).update({$push: {answers: data}})
							 	.then(res=>{
							 		interviewModel.refreshResults();
							 		resolve(res);
							 	}).catch(err=>{
							 		reject(err)
							 	})
						 }

					}
				})
			})
		}


	}


	}())
