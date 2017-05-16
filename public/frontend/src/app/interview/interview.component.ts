import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import  {httpConnection} from '../tokens'
@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {


	private interviewList;
	private preResultInterview = {

	};

	private formInterview:FormGroup;

  constructor(@Inject(httpConnection) private _http, private _fb:FormBuilder) {

  	this._http.getInterviewList().subscribe(interviewList=>{
  		this.interviewList = interviewList;
  		console.log(this.interviewList)
  		debugger
  	}, 
  	(err)=>{
  		//debugger
  	})
   

   }



   private setVarian(interview, answer, e){

   	//console.log(arguments)
   	

   	if(e.target.checked){


	   	if(this.preResultInterview[interview._id]){
	   		if(interview.isMultiple){
	   			this.preResultInterview[interview._id].push(answer.indexAnswer);
	   		}
	   		else{
	   			this.preResultInterview[interview._id] = [];
	   			this.preResultInterview[interview._id].push(answer.indexAnswer);
	   		}
	   	}

	   	if(!this.preResultInterview[interview._id]){
	   		this.preResultInterview[interview._id] = [];
	   		this.preResultInterview[interview._id].push(answer.indexAnswer);
	   	}

   	}

   	if(!e.target.checked){
   		this.preResultInterview[interview._id] = this.preResultInterview[interview._id].filter(indexAnswer=>{
   			return indexAnswer!=answer.indexAnswer;
   		})
   	}

   	console.log(this.preResultInterview);
     debugger
   	

   }


   private sendInterviewResult(idInterview){
   		if(!this.preResultInterview[idInterview])
   			return false;

   		let masResult = this.preResultInterview[idInterview].map(indexAnswer=>{
   			return {_id: idInterview, indexesAnswers:indexAnswer};
   		})
 
   		this._http.sendInterviewResult(masResult).subscribe(()=>{
         debugger
   				this._http.getInterviewList().subscribe(interviewList=>{
   					console.log(interviewList)
		  		debugger
		  		this.interviewList = interviewList;
  			})
   			debugger
   		}, 
   		()=>{
   			debugger
   		})
   }



   

  ngOnInit() {

  }


}
