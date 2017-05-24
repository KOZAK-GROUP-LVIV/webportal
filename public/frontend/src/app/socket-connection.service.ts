import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
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



import * as io  from 'socket.io-client';



@Injectable()
export class SocketConnectionService {



  public socket = io('https://evening-savannah-51961.herokuapp.com:20680');
  public userInfo;
  public dualMsgStream = Observable.fromEvent(this.socket, 'incomDualMsg');
  public generalMsgStream = Observable.fromEvent(this.socket, 'incomGeneralMsg');
  public refreshUsersStream = Observable.fromEvent(this.socket, 'refreshUsers');
  public logoutStream = new Subject();
  public chatUsersStream = Observable.fromEvent(this.socket, 'getUsersChat');
  public dualHistoryStream = Observable.fromEvent(this.socket, 'getDualHistory');
  public generalHistoryStream = Observable.fromEvent(this.socket, 'getGeneralHistory');
  public writeMessageStream = Observable.fromEvent(this.socket, 'writeMessage');
  public onReadMessage = Observable.fromEvent(this.socket, 'readMessage');
  public generalConferenceStream = Observable.fromEvent(this.socket, 'getGeneralConference');

  public profileStream = Observable.fromEvent(this.socket, 'profile')
    .filter((res:{isSucces:boolean, user: {}})=>{
    return res.isSucces;
  }).map((res:{isSucces:boolean, user: {}})=>res.user);

  constructor(private _router:Router) {
    this.profileStream.subscribe(user=>{
      this.userInfo = user;
    })
	  this.init();
   }


   private getGeneralConference(){
      this.socket.emit('getGeneralConference');
   }



   public getChatUserList(idUser:number){
      this.socket.emit('getUsersChat');
   }


   public sendDualMsg(idAddressee, body){
       this.socket.emit('sendDualMsg', {idAddressee, body});       
   }

   public sendGeneralMsg(body){       
       this.socket.emit('sendGeneralMsg', {idAddressee:this.userInfo._id, body});    
   }


   public getGeneralHistory(pagination){
      this.socket.emit('getGeneralHistory', {pagination});   
   }


   public getProfile(){
       this.socket.emit('getProfile');
   }



   public getDualHistory({partnerId, pagination}){
     this.socket.emit('getDualHistory', {partnerId, pagination});
   }


   public logout(){
     this.socket.emit('logout');
     this.init();
      return Observable.create((observer: Observer<any>)=>{
       this.socket.on('logout', (res)=>{
         console.log(res)
            if(res.isSucces){
             observer.next(res.isSucces);
           }
            if(!res.isSucces){
             observer.error(res);
           }
       })
     })

   }


  public login(){
    this.socket.emit('login');
    return Observable.create((observer: Observer<any>)=>{
       this.socket.on('authorization', (res)=>{
       //  console.log(res)
        // debugger
            if(res.isSucces){
             observer.next(res.isSucces);
           }
            if(!res.isSucces){
          //    debugger
             observer.error(res);
           }
       })
     })

  }


  private readMessage({idMessage, authorId, readerId, isGeneral}){

    this.socket.emit('readMessage', {idMessage, authorId, readerId, isGeneral});
  }


  private writeMessage(id){
    this.socket.emit('writeMessage', id);
  }



  private init(){

    this.socket.on('connect', ()=>{


        this.socket.on('redirectLogin', ()=>{        
           this._router.navigate(['entry', 'login']);
        })


    this.socket.on('authorization', ({isSucces})=>{
    //  debugger
      if(isSucces){
      //    this._router.navigate(['chat']);
      }
      if(!isSucces){
        this._router.navigate(['entry', 'login']);
      }

    })


    });



  }






}
