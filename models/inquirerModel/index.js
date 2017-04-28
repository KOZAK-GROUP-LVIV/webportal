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
	answers : {
		type:[{
			text: {
				type:String,
				required : [true, 'answers text is required']
				},

			isTrue: {
				type:Boolean,
				required : [true, 'answers flag is required']
			}
		}]
	},
	date : {
		type:Date,
		default: Date.now()
	},
	author : {
		type: Schema.Types.ObjectId,
		required : [true, 'author _id is required']
		ref: 'users'
	}
});

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
		}
	}


	}())
