import { Component, OnInit, Inject } from '@angular/core';
import { httpConnection, socketConnection } from '../tokens'
import { HttpConnectionService } from '../http-connection.service'
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  private user;
  private isAuth;
  private isAdmin;
  private isClassVisible:boolean = false;
  private showAdapMenu:boolean = false;

  constructor(@Inject(httpConnection) private _http:HttpConnectionService, 
    @Inject(socketConnection) private _socket, 
    private _route:Router, private _actRoute:ActivatedRoute) {


        this._http.authStream.subscribe(res=>{
          this.isAuth = res;
        });

        this._http.adminStream.subscribe(res=>{
   
          this.isAdmin = res;
        });
      

      this._http.isAdminUser().subscribe(res=>{
      
        this.isAdmin = res;
      });

      this._http.isAuthUser().subscribe(res=>{
        this.isAuth = res;
      });

   }




   private logout(){

     	this._http.logout().subscribe(()=>{
     		this.isAuth = false;
        this._route.navigate(['/entry', 'login']);  
        this._socket.logout().subscribe(()=>{
        //  debugger
         //this._route.navigate(['/entry', 'login']);
          
        },()=>{
         // debugger
        });

     	},
     	()=>{

     	});

   }

  ngOnInit() {
  }

}
