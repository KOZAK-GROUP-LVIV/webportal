import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'padinationNews',
  templateUrl: './paginationNews.html'
})
export class padinationNews {


  @Input()
 public page;

 @Input()
 public count:number;

 @Output() 
 public	pageChange: EventEmitter<number> = new EventEmitter<number>();

 private newsId;
 



 constructor(private router:Router, private actRoute:ActivatedRoute){
 	this.actRoute.queryParams.subscribe((param)=>{
 		
 		if(param.pagination){
 			
 			this.page = param.pagination;
 		}
 		else{
 			
 			this.page = 1;
 		}
 	});
 }

 public selectPage(index) {
 //	console.log(arguments)
 //	debugger
 //	console.log(index)
 //	debugger
 	if(!isNaN(index))
	this.pageChange.emit(index);

	}
}
