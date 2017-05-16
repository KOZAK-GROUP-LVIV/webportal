import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import  { httpConnection } from '../tokens';
import  { Router, ActivatedRoute } from '@angular/router';
import { HttpConnectionService} from '../http-connection.service'


@Component({
  selector: 'app-interview-editor',
  templateUrl: './interview-editor.component.html',
  styleUrls: ['./interview-editor.component.css']
})
export class InterviewEditorComponent implements OnInit {


 private interviewList;
 private currInterviewId;
 private currInterviewSelect;

 @ViewChild('formInterview')
 private formInterview;

  constructor(@Inject(httpConnection) private _http:HttpConnectionService, private router:Router, private _actRoute:ActivatedRoute) {

  	

  	this.getInterviewList();


  	this._actRoute.queryParams.subscribe(params=>{
  		if(params.currInterviewId){
  			this.currInterviewId = params.currInterviewId;
  			this.getInterview(this.currInterviewId);
  		}
  	});

  	this._http.updateIntervieStream.subscribe(interviewList=>{
  		this.interviewList = interviewList;
  		if(this.currInterviewId){
  			this.getInterview(this.currInterviewId);
  		}
  	})


    }


    private getInterviewList(){

    		this._http.getInterviewList().subscribe(interviewList=>{
  		//console.log(interviewList)
  		//debugger
  		this.interviewList = interviewList;
  		//console.log(this.interviewList)
  		//debugger
		  	}, 
		  	(err)=>{
		  		//debugger
		  	});

    }


    private getInterview(id){
    		this._http.getInterview(id).subscribe((interview)=>{
    			this.currInterviewSelect = interview[0];
    		})
    }



    private editInterview(interview){
    	this.formInterview.editInterview(interview);
    }


    private removeInterview(id){
    	this._http.removeInterview(id).subscribe(()=>{
    		debugger
    		this.getInterviewList();
    	},
    	()=>{

    	})
    }






    private choiceInterview(interview){
    	this.currInterviewId = interview._id;
    	this.currInterviewSelect = interview;
    	this.router.navigate(['admin/editInterviews'], {queryParams : {currInterviewId: this.currInterviewId} });
    }


  ngOnInit() {
  }

}
