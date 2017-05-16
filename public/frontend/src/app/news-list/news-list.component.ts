import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {httpConnection, socketConnection} from '../tokens';
@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {


  private pagination:number = 1;
  private postsCount;
  private paginationMas  = [];
  private news;
  private users = [];

  @ViewChild('pagination')
    private paginationElem;

  constructor(@Inject(httpConnection) private _http, private _actRoute:ActivatedRoute,
  	private _router:Router) { 

  	this._actRoute.queryParams.subscribe((param:{pagination:number})=>{
  		if(param.pagination){
  			this.pagination = param.pagination;
  		}
  		if(!param.pagination){
  			this.pagination = 1;
  		}

  		this.getNewsList();
  	});

  }


  private getNewsList(){

  	this._http.getNewsList(this.pagination).subscribe((posts)=>{
  		//console.log(posts)
  		//debugger
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





  ngOnInit() {
   // debugger
   // console.log(this.paginationElem)

    this.paginationElem.count = this.postsCount;

  }

}
