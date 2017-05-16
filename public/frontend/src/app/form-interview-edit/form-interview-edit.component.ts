

import { Component, OnInit, Input, Inject, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbModal, NgbActiveModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {httpConnection} from '../tokens';




@Component({
  selector: 'ngbd-modal-content',
  template: `
<div class="modal-header">
      <h4 class="modal-title">{{title}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  <div class="modal-body" [formGroup]="interviewGroup">
   <div class="form-group row" >
  <label for="example-text-input" class="col-2 col-form-label">Текст запитання</label>
  <div class="col-10">
    <input class="form-control" type="text" formControlName="question">
  </div>
	</div>

<div class="form-group">
    <label for="exampleSelect1">Тип опитування</label>
    <select formControlName="isMultiple" class="form-control" id="exampleSelect1">
      <option value="false">Однозначний</option>
      <option value="true">Багатозначний</option>
    </select>
  </div>

  <div class="form-group-wrap" formArrayName="answers">

	  <div class="form-group row no-gutters" *ngFor="let answer of interviewGroup.controls.answers.controls; let i=index">
    <button (click)="removeAnswer(i)" type="button" class="close" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
	  <label for="example-text-input" class="col-12 col-form-label">Текст відповіді № {{i+1}}</label>
	  <div class="col-12" [formGroupName]="i">
	    <input  class="form-control" type="text" formControlName="text">
	  </div>
		</div>

 </div>




<button type="button" class="btn btn-success" (click)="addAnswer()">Додати варіант відповіді</button>


</div>

    <div class="modal-footer">
    
      <button type="button" class="btn btn-success" (click)="addInterview(interviewGroup)">{{action}}</button>
      <button type="button" class="btn btn-secondary" (click)="activeModal.close('Close click')">Выйти</button>
    </div>

    
  `
})
export class modalInterviewEditor {

    @Input()
   private selectInterview;
    @Input()
   private routerParams;


   private title;
   private action;
   private interviewGroup:FormGroup;
   private isInvalidForm = false;


  constructor(public activeModal: NgbActiveModal, private _router:Router, @Inject(httpConnection) private _http, private _fb:FormBuilder) {
  	
  	this.interviewGroup = this._fb.group({
  	  question : [null, Validators.compose([Validators.minLength(3), Validators.maxLength(50)])],
      isMultiple : [null, Validators.required],
      answers : this._fb.array([this.initAnswer()])
  	});




  }


    private removeAnswer(i:number){
      const control = <FormArray>this.interviewGroup.controls['answers'];
      control.removeAt(i);
    }



  	private addAnswer(){
  		const control = <FormArray>this.interviewGroup.controls['answers'];
  		control.push(this.initAnswer());
  	}


  	private initAnswer(textInput=''){

  		textInput = textInput ? textInput : '';
  		return this._fb.group({
            text: [textInput, Validators.compose([Validators.minLength(1)])]
        });
  	}


  	private loadAnswer(answers){
  		const control = <FormArray>this.interviewGroup.controls['answers'];
  		control.removeAt(0);

  		for(let i=0; i<answers.length; i++){
  			control.push(this.initAnswer(answers[i].text));
  		}
  
  	}

	private addInterview(form:FormGroup){
	
		this.isInvalidForm = !form.valid;

		
		if(form.valid){
	      if(!this.selectInterview){
	      	let answers = form.value.answers.map((answer, index)=>{
				 answer.indexAnswer = index;
				 return answer;
					}),
	      		value = form.value;
	      		value.answers = answers;


	      		console.log(value);
				debugger
				this._http.addInterview(value).subscribe(()=>{
					debugger
					
				  	this._http.getInterviewList().subscribe(()=>{
				  		this.activeModal.close();
				  	}, 
				  	()=>{

				  	})
				  	
					
				},
	     	 	(err)=>{
	     	 		debugger
			        this.isInvalidForm = true;
			        
	      		});

      }  

      else{
       let answers = form.value.answers.map((answer, index)=>{
				 answer.indexAnswer = index;
				 return answer;
					}),
	      	value = form.value;
	      	value.answers = answers;
	      	value.question = form.value.question;
	      	value.isMultiple = form.value.isMultiple;
	      	value._id = this.selectInterview._id;

	      	console.log(value);


        this._http.updateInterview(value).subscribe(()=>{
        	debugger

        	 	this._http.getInterviewList().subscribe(()=>{
				  		this.activeModal.close();
				  	}, 
				  	()=>{

				  	})

        },(err)=>{

        	})
        
        }
      
      	}

		}

	



  	ngOnInit() {
  		
  			console.log(this.selectInterview)

  			if(this.selectInterview){
  				let question  = this.selectInterview.question,
  					isMultiple = String(this.selectInterview.isMultiple);
  					this.interviewGroup.controls.question.setValue(question);
  					this.interviewGroup.controls.isMultiple.setValue(isMultiple);
					this.loadAnswer(this.selectInterview.answers);
  					
  					//this.interviewGroup.controls.answers.setValue(forms);
  		    }
  		  
		
  			this.title = (!this.selectInterview) ? 'Додати опитування' : 'Редагувати опитування';
  			this.action = (!this.selectInterview) ? 'Додати' : 'Редагувати';
  }


}

@Component({
  selector: 'app-form-interview-edit',
  templateUrl: './form-interview-edit.component.html',
  styleUrls: ['./form-interview-edit.component.css']
})
export class FormInterviewEditComponent implements OnInit {


	@Input()
	public routerParams;


  constructor(private modalService: NgbModal, @Inject(httpConnection) private _http) {


   }

   private open(options: NgbModalOptions = {size: "lg"}) {
    const modalRef = this.modalService.open(modalInterviewEditor,options);
    // modalRef.componentInstance.routerParams = this.routerParams;
  }

  public editInterview(interview, options: NgbModalOptions = {size: "lg"}){

  	const modalRef = this.modalService.open(modalInterviewEditor,options);
    modalRef.componentInstance.selectInterview = interview;
  ///  modalRef.componentInstance.routerParams = this.routerParams;
  }

  ngOnInit() {
  }

}
