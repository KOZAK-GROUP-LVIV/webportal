

import { Component, OnInit, Input, Inject, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
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
  <div class="modal-body">
   <div class="form-group row"  [formGroup]="newsGroup">
  <label for="example-text-input" class="col-2 col-form-label">Заголовок</label>
  <div class="col-10">
    <input class="form-control" type="text" formControlName="title">
  </div>
</div>

<div class="form-group">
    <label for="exampleTextarea">Наповлення</label>
     <ckeditor
  [(ngModel)]="ckeditorContent">
    <ckbutton [name]="'saveButton'"
      [command]="'saveCmd'"
      (click)="save($event)"
      [icon]="'save.png'"
      [label]="'Save Document'"
      [toolbar]="'clipboard,1'">
    </ckbutton>
</ckeditor>
  </div> 


</div>

   



    <div class="modal-footer">
    
      <button type="button" class="btn btn-success" (click)="addNews(newsGroup)">{{action}}</button>
      <button type="button" class="btn btn-secondary" (click)="activeModal.close('Close click')">Выйти</button>
    </div>

    
  `
})
export class modalNewsEditor {

    @Input()
   private selectNews;
    @Input()
   private routerParams;


   private title;
   private action;
   private newsGroup:FormGroup;
   private isInvalidForm = false;
   private ckeditorContent;


  constructor(public activeModal: NgbActiveModal, private _router:Router, @Inject(httpConnection) private _http, private _fb:FormBuilder) {
  	
  	this.newsGroup = this._fb.group({
  		title : [null, Validators.compose([Validators.minLength(3), Validators.maxLength(20)])]
  	});


  }

	private addNews(form:FormGroup){
	
		this.isInvalidForm = !form.valid;
		if(!form.valid)
     return false;
      
	      if(!this.selectNews){
          let body =  {excerpt:this.ckeditorContent,
                      textHtml:this.ckeditorContent,
                      title : form.value.title
                    }           
          this._http.addNews(body).subscribe(()=>{
              debugger
              this._http.getNewsList(this.routerParams.pagination).subscribe(()=>{
                this.activeModal.close();
              }, 
              ()=>{

              });
              },
              (err)=>{
                  this.isInvalidForm = true;
                  
                });
  }

    
             
      else{
        let updatedNewstInfo = {};
        for(let key in this.selectNews){
          if(form.value[key]){
            updatedNewstInfo[key] = form.value[key];
          }
          if(!form.value[key]){
            updatedNewstInfo[key] = this.selectNews[key];
          }
        }
  
        this._http.updateNews(updatedNewstInfo).subscribe(()=>{
        	 this._http.getNewsList(this.routerParams.pagination).subscribe(()=>{
				  		this.activeModal.close();
				  	}, 
				  	()=>{

				  	})

        },(err)=>{

        })
        
        }
      
      
		}

	



  	ngOnInit() {
  			console.log(this.selectNews)

  			if(this.selectNews){
            this._http.getNews(this.selectNews).subscribe((news)=>{
              this.newsGroup.controls['title'].setValue(news['title']);
              this.ckeditorContent = news.textHtml;
            })				
  			};
  		    		
  			this.title = (!this.selectNews) ? 'Додати новину' : 'Редагувати новину';
  			this.action = (!this.selectNews) ? 'Додати' : 'Редагувати';
  }


}

@Component({
  selector: 'app-form-news-edit',
  templateUrl: './form-news-edit.component.html',
  styleUrls: ['./form-news-edit.component.css']
})
export class FormNewsEditComponent implements OnInit {


	@Input()
	public routerParams;


  constructor(private modalService: NgbModal, @Inject(httpConnection) private _http) {


   }

   private open(options: NgbModalOptions = {size: "lg"}) {
    const modalRef = this.modalService.open(modalNewsEditor,options);
     modalRef.componentInstance.routerParams = this.routerParams;
  }

  public editNews(news, routerParams,options: NgbModalOptions = {size: "lg"}){

  	const modalRef = this.modalService.open(modalNewsEditor,options);
    console.log(news)
    debugger
    modalRef.componentInstance.selectNews = news._id;
    modalRef.componentInstance.routerParams = this.routerParams;
  }

  ngOnInit() {
  }

}
