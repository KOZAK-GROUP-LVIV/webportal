import { Component, OnInit, Inject } from '@angular/core';
import  { socketConnection, httpConnection } from '../tokens'

@Component({
  selector: 'app-admin-edit-chat',
  templateUrl: './admin-edit-chat.component.html',
  styleUrls: ['./admin-edit-chat.component.css']
})
export class AdminEditChatComponent implements OnInit {


	private users;

  constructor(@Inject(httpConnection)  private _http, @Inject(socketConnection) private _socket) {

  	this.getUsetList();
   }

   private addToWorkers(id){
   	this._http.addToWorkers(id).subscribe(()=>{
   		this._socket.reloadUser(id);
   		this.getUsetList();
   	},
   	(err)=>{

   	})
   }

   private removeFromWorker(id){

   	this._http.removeFromWorker(id).subscribe(()=>{
   		this._socket.reloadUser(id);
   		this.getUsetList();
   	},
   	(err)=>{

   	})

   }


   private removeUser(id){
     this._http.removeUser(id).subscribe(()=>{
         this._socket.reloadUser(id);
         this.getUsetList();
     },
     ()=>{
       
     })
   }



   private getUsetList(){
   	this._http.getUsers().subscribe(users=>{
  		console.log(users);
  		debugger
  		this.users = users;

  	});

   }

  ngOnInit() {
  }

}
