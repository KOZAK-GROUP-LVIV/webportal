import { Component, OnInit, Input, Inject, ViewChild, EventEmitter, Output, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { httpConnection } from '../tokens';
import { HttpConnectionService } from '../http-connection.service';

import 'rxjs/add/observable/from';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import "rxjs/add/operator/takeWhile";
import "rxjs/add/operator/timeout";

interface FileReaderEventTarget extends EventTarget {
    result:string
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage():string;
}



@Component({
  selector: 'ngbd-modal-content',
  styleUrls: ['./form-profile-modal-style.css'],
  template: `
<div class="modal-header">
      <h4 class="modal-title">Налаштування профілю</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  <div class="modal-body" [formGroup]="profileGroup"> 
   <div class="form-group row no-gutters" >
   <div class="mr-2 col-6">
  <img [src]="userInfo?.avatar" #avatar class="img-thumbnail">
  </div>
  <h1 class="col-12">{{userInfo?.login}}</h1>
    </div>


<div class="form-group row mb-5" >
  <label for="example-text-input" class="col-md-2 col-12 col-form-label">Змінити аватар</label>
  <div class="col-md-10 col-9 row no-gutters">
    <label class="custom-file col-12 mb-2">
  <input type="file" id="file" class="custom-file-input" (change)="selectImage($event)">
  <span class="custom-file-control" [ngClass]="{'uploted': isUploated}" style=" "></span>
	</label>
	<button class="btn btn-success" type="button" [disabled]="!isUploated" (click)="changeAvatar()">Змінити</button>
  </div>
</div>

   <div class="form-group row" >
  <label for="example-text-input" class="col-md-2 col-12 col-form-label">Ім’я</label>
  <div class="col-md-10 col-12">
      <div class="input-group">
      <input class="form-control form-control-lg" [readonly]="!editSelect.first_name" (blur)="editSelect.first_name = false" type="text" formControlName="first_name">
      <span class="input-group-btn">
        <button class="btn btn-secondary" (click)="editSelect.first_name = true; editSelect.last_name = false;" type="button"><i class="fa fa-pencil" aria-hidden="true"></i></button>
      </span>
    </div>
  </div>
	</div>

	


<div class="form-group row" >
  <label for="example-text-input" class="col-md-2 col-12 col-form-label">Прізвище</label>
  <div class="col-md-10 col-12">
     <div class="input-group">
      <input class="form-control form-control-lg" type="text" (blur)="editSelect.last_name = false" [readonly]="!editSelect.last_name" formControlName="last_name">
      <span class="input-group-btn">  
        <button class="btn btn-secondary" (click)="editSelect.last_name = true; editSelect.first_name = false;" type="button"><i class="fa fa-pencil" aria-hidden="true"></i></button>
      </span>
    </div>
  </div>
</div>


	
<div class="form-group row" >
  <label for="example-text-input" class="col-md-2 col-6 col-form-label">Працівник</label>
  <div class="col-md-10 col-6 col-form-label">
    {{userInfo?.isWorker | status:'yesNo'}}
  </div>
 </div>

	


</div>

    <div class="modal-footer">
    
      <button type="button" class="btn btn-success" (click)="save(profileGroup)">Зберегти</button>
      <button type="button" class="btn btn-secondary" (click)="activeModal.close('Close click')">Вийти</button>
    </div>

    
  `
})
export class modalProfileEditor {

    @Input()
   private userInfo;
    @Input()
   private routerParams;

   private profileGroup:FormGroup;
   private isInvalidForm = false;
   private editSelect = {
   	first_name : false,
   	last_name : false
   };
   private srcAvatar;
   @ViewChild('avatar')
   private elementImage:ElementRef;
   private isUploated:boolean = false;
   private uploatedFile;
   private isChangeAvatar:boolean = false;





  constructor(public activeModal: NgbActiveModal, private _router:Router, @Inject(httpConnection) private _http, private _fb:FormBuilder) {
  	
  	this.profileGroup = this._fb.group({
      first_name : [null, Validators.required],
      last_name : [null, Validators.required]
  	});


   }



  	private save(form:FormGroup){

  		let userInfo:any = new FormData();
  		
  		for(let control in form.controls){

  			if(this.userInfo[control]){
  				userInfo.append(control, form.controls[control].value)
  			}
  		}
  		if(this.isChangeAvatar){
  			userInfo.append('avatar', this.uploatedFile, this.uploatedFile.name);
  		}

  		this._http.editProfile(userInfo).subscribe(()=>{
  			location.reload();
  			this.activeModal.close();
  		})
  				
  	}

  	private selectImage(event) {
  		let reader = new FileReader();
        this.uploatedFile = event.target.files[0];
        	reader.onload = (e:FileReaderEvent)=>{
            	var input:any = e.target  as FileReaderEventTarget,
            	src = input.result as FileReaderEvent;
                this.srcAvatar = src;
                this.isUploated = true;

        };

        reader.readAsDataURL(this.uploatedFile);
        
    }


    private changeAvatar(){
            this.elementImage.nativeElement.src = this.srcAvatar;
            this.userInfo.avatar = this.srcAvatar;
            this.isUploated = false;
            this.isChangeAvatar = true;

    }




   private setUserInfo(){

  		if(this.userInfo){
  			for(let control in this.profileGroup.controls){

  				if(this.userInfo[control]){
  					this.profileGroup.controls[control].setValue(this.userInfo[control]);
  				}
  			
  			}
  		}

   }

  private getProfile(){
  	this._http.getProfileInfo().filter(res=>res.isSucces).map(res=>res.user).subscribe(user=>{
  		this.userInfo = user;
      console.log(user);
      debugger
      this.setUserInfo()
  	})
  }





  	ngOnInit() {
  		this.getProfile();


  	}


}

@Component({
  selector: 'app-form-profile-edit',
  templateUrl: './form-profile-edit.component.html',
  styleUrls: ['./form-profile-edit.component.css']
})
export class FormProfileEditComponent implements OnInit {


  private userInfo;

  constructor(private modalService: NgbModal, @Inject(httpConnection) private _http:HttpConnectionService) {

  }

  private open(options: NgbModalOptions = {size: "lg"}) {
    const modalRef = this.modalService.open(modalProfileEditor,options);
  }

  ngOnInit() {

  }

}
