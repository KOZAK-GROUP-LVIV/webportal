import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ngbd-pagination-basic',
  templateUrl: './paginationNews.html'
})
export class NgbdPaginationBasic {


 @Input()
 public page;

 @Input()
 public count:number;

 @Output() 
 public	pageChange: EventEmitter<number> = new EventEmitter<number>();

 private newsId;
 



 constructor(private router:Router, private actRoute:ActivatedRoute){
 	this.actRoute.queryParams.subscribe((param)=>{
 	//	debugger
 		if(param.pagination){
 	//		debugger
 			
 			this.page = param.pagination;
 		}
 	});
 }

 public selectPage(index) {
 //	console.log(index)
 //	debugger
 	if(!isNaN(index))
	this.pageChange.emit(index);

	}
}
