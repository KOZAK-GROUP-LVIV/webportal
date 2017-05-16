import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import {httpConnection} from '../tokens';




@Component({
  selector: 'app-news-editor',
  templateUrl: './news-editor.component.html',
  styleUrls: ['./news-editor.component.css']
})
export class NewsEditorComponent implements OnInit {

	private pagination:number =  1;
	private newsList;
	private currNewsId;
	private currNewsScreen;

	private fullCountPosts:number;

	@ViewChild('formNews')
 	 private formNews

 	@ViewChild('pagination')
 	 private paginationElem;

  constructor(@Inject(httpConnection) private _http, private _actRoute:ActivatedRoute, private _router:Router) {
  	this._actRoute.queryParams.subscribe((param)=>{
  		if(param.newsId){

  			this.currNewsId = param.newsId;
  			this.getNews(param.newsId);
  			if(this.formNews){
  				this.formNews.routerParams = {pagination: this.pagination, currNewsId: this.currNewsId};
  			}
  			
  		}
  		if(param.pagination){
  			this.pagination = param.pagination;
  			
  		}
  		this.getNewstList();
  	});


  	
	  	this._http.updateNewsStream.subscribe(newList=>{
	  		this.newsList = newList.posts;
        if(this.currNewsId){
          this.getNews(this.currNewsId);
        }

	  	})
  	
   }


   private getNewstList(){
   	this._http.getNewsList(this.pagination).subscribe(newsList=>{
   		//debugger
  		this.newsList = newsList.posts;
 
  		this.fullCountPosts = newsList.count;
  		if(this.paginationElem){
  			 this.paginationElem.count = newsList.count;
  			 console.log(this.paginationElem)
  		}
  	})
   }



   private choiceNews(id){ 	
   	if(id)
 	this._router.navigate(['/admin/editNews'], { queryParams: { newsId: id, pagination: this.pagination }})
 	
   }

   private editNews(news, params={pagination: this.pagination, currNewsId: this.currNewsId}){

   	this.formNews.editNews(news, params);
   	this.formNews.routerParams = {pagination: this.pagination, currNewsId: this.currNewsId};
   }



   private getNews(id){
   	  	this._http.getNews(id).subscribe(news=>{
   		this.currNewsScreen = news;
   	})
   }


   private removeNews(id){
   		this._http.removeNews(id).subscribe(news=>{
   		this.currNewsScreen = news;
   		this.getNewstList();
   		})
   }


   private onPageChange(index){
   //	console.log(index)
   //	debugger
   		this.pagination = index;
   		this._router.navigate(['/admin/editNews'], { queryParams: { newsId: this.currNewsId, pagination: String(index) } })
   }

  ngOnInit() {
  	this.formNews.routerParams = {pagination: this.pagination, currNewsId: this.currNewsId};
  	this.paginationElem.count = this.fullCountPosts;
  	this.paginationElem.page = this.pagination;

  }

}
