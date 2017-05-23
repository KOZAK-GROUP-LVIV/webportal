import { Component, OnInit, Inject, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { HttpConnectionService } from '../http-connection.service'
import * as $ from "jquery";
import { ActivatedRoute, Router } from '@angular/router';    

import { httpConnection, socketConnection } from '../tokens';
@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewsListComponent implements OnInit {


  @ViewChild('postWrap')
  postWrap:ElementRef;
  private pagination:number = 1;
  private postsCount;
  private paginationMas  = [];
  private news;
  private users = [];
  private newsId;

  @ViewChild('pagination')
    private paginationElem;

  constructor(@Inject(httpConnection) private _http:HttpConnectionService, private _actRoute:ActivatedRoute,
  	private _router:Router) { 

  	this._actRoute.queryParams.subscribe((param:{pagination:number, newsId:string})=>{
  		if(param.pagination){
  			this.pagination = param.pagination;
  		}
  		if(!param.pagination){
  			this.pagination = 1;
  		}
      if(param.newsId){
        this.newsId = param.newsId;
        this.getNews(param.newsId);
        
      }
      if(!param.newsId){
        this.newsId = null;
      }
        this.getNewsList();        
      
  	});

  }
  

  private getNews(_id){
     this.postWrap.nativeElement.querySelector('.textTitle').innerHTML = "";
     this.postWrap.nativeElement.querySelector('.textHtml').innerHTML = "";
     this._http.getNews(_id).subscribe((post)=>{
      //console.log(post)    
      this.postWrap.nativeElement.querySelector('.textTitle').innerHTML = post.title;
      this.postWrap.nativeElement.querySelector('.textHtml').innerHTML = post.textHtml;

    })
  }

  private getNewsList(){

  	this._http.getNewsList(this.pagination).subscribe((posts)=>{
  	console.log(posts)
  	debugger
  			this.news = posts.posts;
        this.postsCount = posts.count;
        if(this.paginationElem){
          this.paginationElem.count = posts.count;
        }


  	},
  	()=>{

  	});
  }


  private changePagination(index:number){
   
  	this._router.navigate(['/news'], {
        queryParams: {pagination: index}
    })

  }

  public options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };






  ngOnInit() {
   // debugger
   // console.log(this.paginationElem)
   if(this.paginationElem)
    this.paginationElem.count = this.postsCount;

  }

}
