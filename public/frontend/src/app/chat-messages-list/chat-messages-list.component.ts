import { Component, OnInit, Input, Inject, ViewChild, ElementRef, OnDestroy, HostListener } from '@angular/core';
import { socketConnection } from '../tokens'
import { ActivatedRoute } from  '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
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

@Component({
  selector: 'app-chat-messages-list',
  templateUrl: './chat-messages-list.component.html',
  styleUrls: ['./chat-messages-list.component.css']
})
export class ChatMessagesListComponent implements OnInit, OnDestroy {


  private generalMsgList = [];
  private renderMsgList = [];
 

  @Input()
  public pagination = {
  	general : 1
  };


   @ViewChild('chatMessages')
  private chatMessages:ElementRef;

  @ViewChild('chatList')
  private chatList:ElementRef;

  @Input()
  public currMsgList = 'general';
  @Input()
  public userList;
  public currId;
  public myPersonInfo;


  private isWork = true;

  private currentHeightList:number;
  private isLoadList = false;
  private currScroll;
  private buffScroll;
  private buffHeight;



  constructor(@Inject(socketConnection) private _socket, private _actRoute:ActivatedRoute,  @Inject(DOCUMENT) private _document) {


     this._socket.profileStream.takeWhile(() => this.isWork).subscribe(user=>{
      this.myPersonInfo = user;
    });
     this._socket.getProfile();

 
  	this._actRoute.queryParams.subscribe((param:{userid, conference})=>{
        if(!param.conference&&param.userid){
            this.currId = param.userid;
            this.currMsgList = 'dual';
            this.getDualHistory();
        }
        if(param.conference=='general'&&!param.userid){
            this.currMsgList = 'general';
            debugger
            this.getGeneralHistory();
            this.currId = null;
        }    
  	})


    this._actRoute.params.subscribe((param:{mode})=>{
      if(param.mode=='dialogs'&& !this.currId){
        this.getGeneralHistory();
        this.currId = null;
        debugger
      }

    });

  	this._socket.dualHistoryStream.takeWhile(() => this.isWork).subscribe(res=>{
      //debugger
  		 if(res.isSucces){
              if(res.history){
                 console.log(res.history.history)
                 debugger
                this.buffScroll = this.currScroll;
                this.buffHeight = this.currentHeightList;
                this.renderMsgList = res.history.history;
                this.setScrollInBuff(); 
                this.isLoadList = true;
                this._socket.getChatUserList();
                this._socket.getGeneralConference();
              }
              else{
                   this.renderMsgList = []
              }
           }
            if(!res.isSucces){
             
           }
  	});




    this._socket.onReadMessage.takeWhile(() => this.isWork)
    .filter(({reader, writer})=>reader==this.currId||writer==this.currId)
      .subscribe(readUserId=>{
      this.getDualHistory();
    })


  	this._socket.generalHistoryStream.takeWhile(() => this.isWork).subscribe(res=>{
  		         if(res.isSucces){
                  if(res.history){
                       console.log(res.history.history)
                       debugger
                      this.buffScroll = this.currScroll;
                      this.buffHeight = this.currentHeightList;
                      this.renderMsgList = res.history.history;
                      this.setScrollInBuff(); 
                      this.isLoadList = true;

                      this._socket.getChatUserList();
                      this._socket.getGeneralConference();
                  }
                  else{
                       this.renderMsgList = []
                  }
           }
            if(!res.isSucces){
             
           }
  	})	

   }	



  public incomGeneralMsg(msg){

  	if(this.currMsgList === 'general'){
      console.log(msg);
      debugger
  		this.renderMsgList.push(msg);
      this.onScrollBottom();
      this._socket.readMessage({idMessage: msg._id, authorId: msg.author._id, readerId: this.myPersonInfo._id, isGeneral:true});
  	}
  }


  public incomDualMsg(msg){
    
  	if(this.currMsgList === 'dual'){
      this.renderMsgList.push(msg);
      this.onScrollBottom();
  		
      if(msg.author._id == this.currId){
         this._socket.readMessage({idMessage: msg._id, authorId: msg.author._id, readerId: this.myPersonInfo._id});
       
      }
  	}
  }



  public getDualHistory(){
   
   // debugger
    this.pagination[this.currId] = this.pagination[this.currId] ? this.pagination[this.currId] : 1;
  	this._socket.getDualHistory({partnerId:this.currId, pagination: this.pagination[this.currId]});
  }


  public setScrollInBuff(){
     setTimeout(()=>{
       if(this.pagination[this.currId]>1){
         let currHeightList = this.chatList.nativeElement.clientHeight;
         this.chatMessages.nativeElement.scrollTop =  currHeightList - (this.buffHeight - this.buffScroll);
         this.isLoadList = true;
       }
       else{
         this.onScrollBottom();
       }
     },400)
    
  };




  public getGeneralHistory(){
    this.pagination['general'] = this.pagination['general'] ? this.pagination['general'] : 1;
  	this._socket.getGeneralHistory(this.pagination['general']);
  }


  public onScrollBottom(){
  	setTimeout(()=>{
  		this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight-15;
  	},150);
  	
  }

  ngOnInit() {

  }

  ngOnDestroy(){
      this.isWork = false;
  }


  loadHistory(){

       let isAddPost = ()=>{

            let chatMessages =  this.chatMessages.nativeElement as HTMLElement;
            let chatList = this.chatList.nativeElement as HTMLUListElement;
            this.currentHeightList  =  chatList.clientHeight;
            this.currScroll =  chatMessages.scrollTop;



            Observable.create((observer:Observer<any>)=>{
             observer.next(this.currScroll)
           }).filter(()=>{

             return (0>this.currScroll - 350);
           }).filter(()=>{
             return this.isLoadList;
           }).subscribe(()=>{
             this.isLoadList = false;

             this.pagination[this.currId] = this.pagination[this.currId] ? this.pagination[this.currId]+1 : 1;
             this.getDualHistory();
                
           })

           }

           if(this.chatMessages.nativeElement){
            isAddPost();
            }
            
       }





}
