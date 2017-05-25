import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { httpConnection, cookieS } from '../../tokens';



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



@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, @Inject(httpConnection) private _http, @Inject(cookieS) private _cookie) {
	//	console.log(this._cookie);
		//debugger

     }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if(this._cookie.isInit){
			if(!this._cookie.getAuthStatus()){
				this._http.isAdminUser().subscribe(res=>{});
				this._http.isAuthUser().subscribe(res=>{});
				this.router.navigate(['/entry', 'login']);		
			}
			else{
				this._http.isAdminUser().subscribe(res=>{});
				this._http.isAuthUser().subscribe(res=>{});
				return true;
			}
		}
		else{
			return new Observable((observer:Observer<boolean>)=>{
				this._http.isAuthUser().subscribe(res=>{

					if(!res){
						debugger
						observer.next(res);
						this.router.navigate(['/entry', 'login']);
					}
					else{   				
						observer.next(true);

					}
				})

			}) 
		}
    }

}