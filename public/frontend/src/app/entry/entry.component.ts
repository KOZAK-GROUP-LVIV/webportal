import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import {httpConnection, socketConnection} from '../tokens';
import  {HttpConnectionService} from '../http-connection.service'



@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {


  private currForm:string = 'singin';

  private entryForm: FormGroup;
  private validForm:boolean =  true;
  private submitedInvalidForm: boolean = false;

  constructor(private _fb:FormBuilder,
   @Inject(httpConnection) private _http:HttpConnectionService,
   @Inject(socketConnection) private _socket,
   private _actRoute:ActivatedRoute,
   private _roter:Router) {

  	this.entryForm = this._fb.group({
  		'login' : ['', Validators.compose([Validators.minLength(5), Validators.maxLength(15)])],
      'password' : ['', Validators.compose([Validators.minLength(7), Validators.maxLength(15)])],
      'first_name' : ['', Validators.compose([Validators.minLength(3), Validators.maxLength(15)])],
      'last_name' : ['', Validators.compose([Validators.minLength(3), Validators.maxLength(15)])]
  	});

    this._actRoute.params.subscribe((mode:{mode:string})=>{
      this.currForm = mode.mode || 'login';
      this._roter.navigate(['/entry', this.currForm]);
    })

   }
   private login(form:FormGroup){
   	this.submitedInvalidForm = !form.valid;

   	if(form.valid){
   
   		this._http.login(form.value).subscribe(()=>{
           debugger
         this._http.isAdminUser().subscribe(()=>{});
         this._http.isAuthUser().subscribe(()=>{});
         this._roter.navigate(['/chat']);
         this._socket.login().subscribe(()=>{

               
         },
         ()=>{

         });

   		}, 
   		()=>{

   		})
   	}
   	
   }


   private singin(form:FormGroup){
     this.submitedInvalidForm = !form.valid;
     if(form.valid){
       this._socket.logout().subscribe(()=>{});
       this._http.isAdminUser().subscribe(()=>{});
       this._http.isAuthUser().subscribe(()=>{});
       this._http.singin(form.value).subscribe(()=>{
           this._roter.navigate(['/entry', 'login']);
       },
       (err)=>{
           this._roter.navigate(['/entry', 'singin']);
       })
     }
   }

  ngOnInit() {
  }

}
