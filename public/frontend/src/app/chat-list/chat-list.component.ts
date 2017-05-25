import { Component, OnInit, Inject, ViewChild, ElementRef, OnDestroy, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { socketConnection } from '../tokens';
import { Gravatar } from 'ng2-gravatar-directive';

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
import 'rxjs/add/operator/debounceTime';

import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit , OnDestroy {

  private userList = [];
  private renderList = [];
  private currUser;
  private msgInput:FormGroup;
  private currId;
  private myPersonInfo;
  private currMsgList;
  private noReadMsgs = {};
  private chatMode;
  private writer;
  private writterId;
  private generalConference;
  private hideMenuUser = false;

  private isWork = true;


  private pagination = {
    general : 1
  };




  @ViewChild('msgList')
  	private msgList;

  @ViewChild('messageInput')
    private  messageInput:HTMLElement;

  constructor(@Inject(socketConnection) private _socket, private _fb:FormBuilder,
    private _actRoute:ActivatedRoute, private _router:Router, @Inject(DOCUMENT) private _document) {

    this._socket.profileStream.takeWhile(() => this.isWork).subscribe(res=>{
        this.myPersonInfo = res;
      });


    this._socket.getProfile();
 

    this._socket.generalConferenceStream.takeWhile(() => this.isWork).subscribe(confecence=>{
     // console.log(confecence);
     // debugger
      this.generalConference = confecence;
    });
 

    this.msgInput = this._fb.group({
      text: [null, Validators.required]
    });


    this._socket.writeMessageStream.takeWhile(() => this.isWork).filter(writter=>writter._id == this.currId).subscribe(writer=>{
     // debugger
      if(this.writterId){
        clearTimeout(this.writterId);
      }
      this.writer = writer;
      this.writterId = setTimeout(()=>{
        this.writer = null;
        }, 3000);
    });

    this.msgInput.valueChanges.debounceTime(300)
        .subscribe((values) => {
         // console.log(values)
        
              if(values.text){
                if(values.text.length>2)
                this._socket.writeMessage(this.currId);
              }
         

        });


     this._socket.onReadMessage.takeWhile(() => this.isWork)
      .filter(({readUserId, writter})=>readUserId==this.currId||writter==this.myPersonInfo._id)
      .subscribe(readUserId=>{
      // debugger
        this._socket.getChatUserList();
        this._socket.getGeneralConference();
    })


    this._socket.generalMsgStream.takeWhile(() => this.isWork).subscribe(msg=>{
     // debugger
      this.msgList.incomGeneralMsg(msg);

    });

    this._socket.dualMsgStream.takeWhile(() => this.isWork).subscribe(msg=>{
  
      this.msgList.incomDualMsg(msg);
    
    });


    this._socket.refreshUsersStream
    .takeWhile(() => this.isWork)
    .subscribe((res)=>{
     debugger
      this._socket.getChatUserList();
      this._socket.getGeneralConference();
    });

    this._socket.chatUsersStream.takeWhile(() => this.isWork).subscribe(res=>{
        if(res.isSucces){
           console.log(res.users);
          //  debugger
             this.userList  = res.users;
             if(this.msgList){
               this.msgList.userList = this.userList;
             }
             

        }
        if(!res.isSucces){

        }
    })

      this._actRoute.queryParams.subscribe((param:{conference, userid})=>{
       // debugger
        if(param.conference=='general'&&!param.userid){
          this.currMsgList = 'general';
          this.hideMenuUser = true;
          this.currId = null;
        }
        if(!param.conference&&param.userid){
          this.currMsgList = 'dual';
          this.currId = param.userid;   
          this.hideMenuUser = true;
        }
        if(!param.conference&&!param.userid){
          this.currId = null;
        }
        
       });

      

      

     this._actRoute.params.subscribe((param:{mode})=>{
        this.chatMode = param.mode; 
        this._socket.getChatUserList();
        this._socket.getGeneralConference();
      if(param.mode=='dialogs'){
         this.currMsgList = 'general';
         this.hideMenuUser = true;
             //  debugger
      }

    });
      
   

     
 }



  private sendMsg(form:FormGroup, e){
    if(e){
       if(e.keyCode != 13)
         return false;
    }
    if(!this.currId&&form.valid){
    //  debugger
       this._socket.sendGeneralMsg(form.value.text);
       form.controls['text'].setValue(null);
    }
    if(this.currId&&form.valid){
        this._socket.sendDualMsg(this.currId, form.value.text);
        form.controls['text'].setValue(null);
    }
  }


  ngOnDestroy(){
      this.isWork = false;
  }


  ngOnInit() {


  }

 

}
